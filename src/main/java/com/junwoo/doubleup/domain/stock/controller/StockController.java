package com.junwoo.doubleup.domain.stock.controller;

import com.junwoo.doubleup.domain.stock.dto.mapper.StockMapper;
import com.junwoo.doubleup.domain.stock.dto.response.StockResponse;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.service.StockGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockGetService stockGetService;
    private final StockMapper stockMapper = StockMapper.INSTANCE;

    @GetMapping("/{id}")
    private Stock findById(@PathVariable(name = "id") Long id) {
        return stockGetService.findById(id);
    }

    //시가총액 순 정렬
    @PostMapping("/marketCap")
    private List<StockResponse> filter(Pageable pageable) {
        List<Stock> marketCap = stockGetService.findAllByFilter(pageable, "marketCap");
        return marketCap.stream().map(stockMapper::toResponse).toList();
    }

}
