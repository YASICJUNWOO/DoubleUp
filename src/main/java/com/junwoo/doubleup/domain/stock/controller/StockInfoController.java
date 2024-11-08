package com.junwoo.doubleup.domain.stock.controller;

import com.junwoo.doubleup.domain.stock.entity.StockDetailInfo;
import com.junwoo.doubleup.domain.stock.repository.StockDetailInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stock/info")
@RequiredArgsConstructor
public class StockInfoController {

    private final StockDetailInfoRepository stockDetailInfoRepository;

    @GetMapping
    public StockDetailInfo getStockInfo(@RequestParam(name = "stockId") Long stockId) {
        return stockDetailInfoRepository.findByStock_StockId(stockId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주식 정보가 존재하지 않습니다."));
    }

}
