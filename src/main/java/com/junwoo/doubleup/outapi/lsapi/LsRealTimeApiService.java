package com.junwoo.doubleup.outapi.lsapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.junwoo.doubleup.outapi.lsapi.dto.RealTimeExchangeRate;
import com.junwoo.doubleup.outapi.lsapi.dto.RealTimeStockPrice;
import com.junwoo.doubleup.outapi.lsapi.dto.RealtimeDataformat;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.net.URI;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class LsRealTimeApiService {

    public static final Map<String, BigDecimal> realTimePriceStore = new ConcurrentHashMap<>();

    private final ObjectMapper objectMapper = new ObjectMapper(); // Jackson ObjectMapper
    private static final String URL = "wss://openapi.ls-sec.co.kr:9443/websocket";

    @Async
    public void sendRequest(String trCd, String trKey) {

        ReactorNettyWebSocketClient client = new ReactorNettyWebSocketClient();

        log.info("WebSocket 연결 중...");
        client.execute(
                URI.create(URL), // 서버 URL
                session -> {
                    // 서버에 초기 메시지 전송
                    Mono<Void> send = session.send(
                            Flux.just(
                                    session.textMessage(createRequestMessage(LsApiService.ACCESS_TOKEN, "3", "S3_", "005930")), // 첫 번째 메시지
                                    session.textMessage(createRequestMessage(LsApiService.ACCESS_TOKEN, "3", "CUR", "USD   "))     // 두 번째 메시지
                            )
                    );

                    // 서버로부터 지속적으로 메시지 수신 및 로그 출력
                    // 수신한 메시지를 로그 출력
                    Mono<Void> receive = session.receive()
                            .map(WebSocketMessage::getPayloadAsText) // 메시지 텍스트로 변환
                            .doOnNext(this::parser)
                            .then();

                    // send와 receive를 병렬로 실행
                    return send.then(receive);
                }
        ).block(Duration.ofMinutes(10)); // 10분간 실행, 필요 시 연장
    }

    private void parser(String jsonMessage) {
        try {
            // JSON 문자열을 RealtimeDataformat 객체로 변환
            RealtimeDataformat data = objectMapper.readValue(jsonMessage, RealtimeDataformat.class);
            RealtimeDataformat.Header header = data.getHeader();

            if(header.getTrKey() != null) {

                if(header.getTrCd().equals("S3_")) {
                    // body 필드를 명시적으로 RealTimeStockPrice로 매핑
                    RealTimeStockPrice body = objectMapper.convertValue(data.getBody(), RealTimeStockPrice.class);
                    log.info("현재가는 {}", body.getPrice());
                    realTimePriceStore.put(header.getTrKey(), new BigDecimal(body.getPrice()));
                }
                else if (header.getTrCd().equals("CUR")) {

                    RealTimeExchangeRate body = objectMapper.convertValue(data.getBody(), RealTimeExchangeRate.class);

                    // ctime 변환
                    String ctime = body.getCtime();
                    LocalDateTime timestamp = LocalDateTime.now()
                            .withHour(Integer.parseInt(ctime.substring(0, 2)))
                            .withMinute(Integer.parseInt(ctime.substring(2, 4)))
                            .withSecond(Integer.parseInt(ctime.substring(4, 6)));

                    // 출력 포맷 설정
                    DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분 ss초");

                    log.info("{} 현재 {} 환율은 {}", timestamp.format(outputFormatter), header.getTrKey().strip(), body.getPrice());
                    realTimePriceStore.put(header.getTrKey().strip(), new BigDecimal(body.getPrice()));
                }

            }
            else {
                if (data.getHeader().getTrCd().equals("S3_")){
                    log.info("종목 연결 {}", data.getHeader().getRspMsg());
                }
                else if (data.getHeader().getTrCd().equals("CUR")){
                    log.info("환율 연결 {}", data.getHeader().getRspMsg());
                }
            }

        } catch (Exception e) {
            log.error("JSON 파싱 실패: {}", e.getMessage(), e);
        }
    }

    private String createRequestMessage(String token, String trType, String trCd, String trKey) {
        // 요청 JSON 생성
        return String.format(
                "{ \"header\": { \"token\": \"%s\", \"tr_type\": \"%s\" }, \"body\": { \"tr_cd\": \"%s\", \"tr_key\": \"%s\" } }",
                token, trType, trCd, trKey
        );
    }

}
