package com.junwoo.doubleup.outapi.lsapi;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class LsApiService {

    @Value("${ls.appkey}")
    private String APP_KEY;

    @Value("${ls.appsecret}")
    private String APP_SECRET_KEY;

    public static String ACCESS_TOKEN;

    private final LsRealTimeApiService lsRealTimeApiService;

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

        //lsRealTimeApiService.sendRequest("S3_", "005930");
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

    // 국내 주식 오늘 가격 받아오기
    public Map<String, StockPrice> getTodayStockPrice(String stockCodeList, int size) {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://openapi.ls-sec.co.kr:8080")
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(10 * 1024 * 1024))  // 최대 10MB로 증가
                .build();

        String body = """
                {
                  "t8407InBlock" : {
                    "nrec" : %d,
                    "shcode" : "%s"
                  }
                }
                """.formatted(size, stockCodeList);

        LsStockPriceResponse block = webClient.post()
                .uri("/stock/market-data")
                .contentType(MediaType.APPLICATION_JSON)
                .header("authorization", "Bearer " + ACCESS_TOKEN)
                .header("tr_cd", "t8407")
                .header("tr_cont", "N")
                .header("tr_cont_key")
                .header("mac_address")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(LsStockPriceResponse.class)
                .block();

        Map<String, StockPrice> collect = block.getT8407OutBlock1().stream()
                .map(r -> {
                    String shcode = r.getShcode();
                    StockPrice stockPrice = lsMapper.toStockPrice(r);
                    return Map.entry(shcode, stockPrice);
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        //0.5초 지연
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return collect;
    }

    public LsStockPriceByDateResponse getStockPriceDataByDate(LocalDate date, String symbol) {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://openapi.ls-sec.co.kr:8080")
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(10 * 1024 * 1024))  // 최대 10MB로 증가
                .build();

        String body = """
                {
                     "t1305InBlock" : {
                       "shcode" : "%s",
                       "dwmcode" : 1,
                       "date" : "%s",
                       "idx" : 0,
                       "cnt" : 5
                     }
                }
                """.formatted(symbol, date.format(DateTimeFormatter.ofPattern("yyyyMMdd")));

        LsStockPriceByDateResponse block = webClient.post()
                .uri("/stock/market-data")
                .contentType(MediaType.APPLICATION_JSON)
                .header("authorization", "Bearer " + ACCESS_TOKEN)
                .header("tr_cd", "t1305")
                .header("tr_cont", "Y")
                .header("tr_cont_key")
                .header("mac_address")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(LsStockPriceByDateResponse.class)
                .block();

        return block;
    }

}
