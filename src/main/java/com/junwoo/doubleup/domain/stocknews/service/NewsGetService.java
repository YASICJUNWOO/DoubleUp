package com.junwoo.doubleup.domain.stocknews.service;

import com.junwoo.doubleup.domain.stocknews.entity.News;
import com.junwoo.doubleup.domain.stocknews.entity.NewsStock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewsGetService {

    private final NewsStockGetService newsStockGetService;

    // 주식별 뉴스 조회
    public List<News> getNewsByStock(Long stockId) {
        List<NewsStock> newsByStock = newsStockGetService.getNewsByStockId(stockId);
        return newsByStock.stream()
                .map(NewsStock::getNews)
                .toList();
    }

}
