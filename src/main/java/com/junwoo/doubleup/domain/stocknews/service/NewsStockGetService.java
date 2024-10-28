package com.junwoo.doubleup.domain.stocknews.service;

import com.junwoo.doubleup.domain.stocknews.entity.NewsStock;
import com.junwoo.doubleup.domain.stocknews.repository.NewsStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsStockGetService {

    private final NewsStockRepository newsStockRepository;

    // 주식별 뉴스 조회
    public List<NewsStock> getNewsByStockId(Long stockId) {
        return newsStockRepository.findByStock_StockId(stockId);
    }

}

