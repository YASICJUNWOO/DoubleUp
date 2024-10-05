package com.junwoo.doubleup.outapi.naverapi;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class NaverApiService {

    public List<NaverStockResponse.Stock> outStock() {

        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.stock.naver.com")
                .build();

        List<NaverStockResponse.Stock> allStocks = new ArrayList<>();
        int pageSize = 100;

        // 첫 페이지 호출하여 totalCount 얻기
        NaverStockResponse initialResponse = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/stock/exchange/NASDAQ/marketValue")
                        .queryParam("page", 1)
                        .queryParam("pageSize", pageSize)
                        .build())
                .retrieve()
                .bodyToMono(NaverStockResponse.class)
                .block();

        if (initialResponse == null || initialResponse.getTotalCount() == 0) {
            return allStocks; // 데이터가 없는 경우 빈 리스트 반환
        }

        int totalCount = initialResponse.getTotalCount();
        int totalPages = (int) Math.ceil((double) totalCount / pageSize); // 총 페이지 수 계산

        // 첫 페이지 데이터 추가
        allStocks.addAll(initialResponse.getStocks());

        // 2페이지부터 마지막 페이지까지 반복하여 호출
        for (int currentPage = 2; currentPage <= totalPages; currentPage++) {
            // 람다에서 사용할 변수를 따로 선언 (final이 되도록)
            final int pageToRequest = currentPage;

            NaverStockResponse response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/stock/exchange/NASDAQ/marketValue")
                            .queryParam("page", pageToRequest) // 여기서 final 또는 effectively final 변수를 사용
                            .queryParam("pageSize", pageSize)
                            .build())
                    .retrieve()
                    .bodyToMono(NaverStockResponse.class)
                    .block();

            if (response != null && response.getStocks() != null) {
                allStocks.addAll(response.getStocks());
            }
        }

        return allStocks;
    }
}
