package com.junwoo.doubleup.domain.stocknews.service;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockType;
import com.junwoo.doubleup.domain.stock.service.StockGetService;
import com.junwoo.doubleup.domain.stocknews.entity.News;
import com.junwoo.doubleup.domain.stocknews.repository.NewsRepository;
import com.junwoo.doubleup.outapi.tossapi.TossApi;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;
    private final NewsStockService newsStockService;

    private final StockGetService stockGetService;
    private final TossApi tossApi;

    // 실시간 뉴스 업데이트
    @PostConstruct
    public void updateRealTimeNews() {
        List<String> symbolList =
                stockGetService.findAll().stream().map(Stock::getSymbol).toList();

        CompletableFuture.runAsync(() -> {
            getRealTimeNewsBySymbolList(symbolList);
        });
    }

    public void getRealTimeNewsBySymbolList(List<String> symbolList) {

        // symbolList를 변경 가능한 ArrayList로 변환
        List<String> mutableSymbolList = new ArrayList<>(symbolList);

        // 시가총액 상위 10개 주식을 가져온다.
        Pageable pageable = Pageable.ofSize(10);
        List<String> topMarketCaps = stockGetService.findAllByFilter(pageable, "marketCap", StockType.COMMON.name()).stream()
                .map(Stock::getSymbol).toList();

        while (true) {
            Collections.shuffle(mutableSymbolList); // 무작위로 섞기

            for (String symbol : topMarketCaps) {
                Stock stockBySymbol = stockGetService.findAllBySymbol(symbol);
                List<News> newsBySymbol = tossApi.getNewsBySymbol(symbol);

                log.info("Fetched {} news items for stock id: {}", newsBySymbol.size(), stockBySymbol.getStockId());

                // 존재 유무에 따라 news를 저장하고 newsStock을 추가한다.
                newsBySymbol.forEach(news -> {
                    News savedNews = saveNewsIfNotExists(news);
                    newsStockService.addNewStockIfNotExists(stockBySymbol, savedNews);
                });
            }

            for (String symbol : mutableSymbolList) {
                Stock stockBySymbol = stockGetService.findAllBySymbol(symbol);
                List<News> newsBySymbol = tossApi.getNewsBySymbol(symbol);

                log.info("Fetched {} news items for stock id: {}", newsBySymbol.size(), stockBySymbol.getStockId());

                // 존재 유무에 따라 news를 저장하고 newsStock을 추가한다.
                newsBySymbol.forEach(news -> {
                    News savedNews = saveNewsIfNotExists(news);
                    newsStockService.addNewStockIfNotExists(stockBySymbol, savedNews);
                });
            }
        }
    }

    // news가 없다면 news를 저장한다.
    @Transactional
    public News saveNewsIfNotExists(News news) {
        if (newsRepository.existsById(news.getId())) {
            return newsRepository.findById(news.getId()).get();
        }
        return newsRepository.save(news);
    }

}
