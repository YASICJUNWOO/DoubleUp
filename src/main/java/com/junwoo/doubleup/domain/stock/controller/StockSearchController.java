package com.junwoo.doubleup.domain.stock.controller;

import com.junwoo.doubleup.domain.stock.dto.search.request.SearchRequest;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.service.search.StockSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search/stock")
@RequiredArgsConstructor
public class StockSearchController {

    private final StockSearchService stockSearchService;

    @PostMapping
    public List<Stock> searchStock(@RequestBody SearchRequest searchRequest) {
        return stockSearchService.searchStock(searchRequest.keyword());
    }

}
