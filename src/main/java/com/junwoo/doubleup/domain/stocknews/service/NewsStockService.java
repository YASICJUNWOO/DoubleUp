package com.junwoo.doubleup.domain.stocknews.service;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stocknews.entity.News;
import com.junwoo.doubleup.domain.stocknews.entity.NewsStock;
import com.junwoo.doubleup.domain.stocknews.repository.NewsStockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewsStockService {

    private final NewsStockRepository newsStockRepository;

    // stock과 news가 없다면 newsStock을 저장한다.
    public void addNewStockIfNotExists(Stock stockBySymbol, News savedNews) {
        if (!newsStockRepository.existsByStock_StockIdAndNews_Id(stockBySymbol.getStockId(), savedNews.getId())) {
            newsStockRepository.save(NewsStock.builder()
                    .stock(stockBySymbol)
                    .news(savedNews)
                    .build());
        }
    }

}
