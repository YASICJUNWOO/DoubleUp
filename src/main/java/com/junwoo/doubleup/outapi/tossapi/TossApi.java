package com.junwoo.doubleup.outapi.tossapi;

import com.junwoo.doubleup.domain.stocknews.entity.News;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class TossApi {

    private final TossApiMapper tossApiMapper = TossApiMapper.INSTANCE;

    public List<News> getNewsBySymbol(String symbol) {

        List<News> newsList = new ArrayList<>();

        WebClient webClient = WebClient.builder()
                .baseUrl("https://wts-info-api.tossinvest.com")
                .build();

        // 뉴스 요청 URL
        String uri = "/api/v2/news/companies/" + symbol + "?size=20&orderBy=latest";

        // API 호출 및 응답 받기
        TossNewsDto.NewsResponse response = webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(TossNewsDto.NewsResponse.class)
                .block();

        if (response != null && response.getResult() != null) {
            List<TossNewsDto.NewsItem> newsBody = response.getResult().getBody();

            // News 객체로 변환
            newsList =  newsBody.stream().map(tossApiMapper::toNews).toList();
        } else {
            log.warn("No news data received from Toss API.");
        }

        //1초 지연
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return newsList;
    }
}
