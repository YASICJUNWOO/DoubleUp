package com.junwoo.doubleup.outapi.lsapi;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LsApiService {

    @Value("${ls.appkey}")
    private String APP_KEY;

    @Value("${ls.appsecret}")
    private String APP_SECRET_KEY;

    private static String ACCESS_TOKEN;

    private final LsMapper lsMapper = LsMapper.INSTANCE;

    // access token을 받아오는 메소드
    @PostConstruct
    public void setToken() {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://openapi.ls-sec.co.kr:8080")
                .build();

        String body = "grant_type=client_credentials" +
                "&appkey=" + APP_KEY +
                "&appsecretkey=" + APP_SECRET_KEY +
                "&scope=oob";

        TokenDto result = webClient.post()
                .uri("/oauth2/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(TokenDto.class)
                .block();

        ACCESS_TOKEN = result.getAccess_token();
    }

    // 국내 주식 정보 받아오기
    public List<Stock> getKrStocks() {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://openapi.ls-sec.co.kr:8080")
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(10 * 1024 * 1024))  // 최대 10MB로 증가
                .build();

        String body = """
                {
                  "t8436InBlock" : {
                    "gubun" : "0"
                  }
                }
                """;

        KrStockDto block = webClient.post()
                .uri("/stock/etc")
                .contentType(MediaType.APPLICATION_JSON)
                .header("authorization", "Bearer " + ACCESS_TOKEN)
                .header("tr_cd", "t8436")
                .header("tr_cont", "N")
                .header("tr_cont_key")
                .header("mac_address")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(KrStockDto.class)
                .block();


        return block.getT8436OutBlock().stream()
                .map(lsMapper::toStock)
                .toList();
    }


}
