package com.junwoo.doubleup.domain.stock.service.search;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockSearchService {

    private final StockRepository stockRepository;

    public List<Stock> searchStock(String keyword) {
        return stockRepository.searchAndSortByKeywordNative(keyword);
    }
}
