package com.junwoo.doubleup.domain.stockprice.service;

import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class StockPriceCalculator {

    private final StockPriceGetService stockPriceGetService;

    // 개별 주식의 총액 계산 (예외 처리 포함)
    public BigDecimal calculateStockValue(int quantity, Long stockId, LocalDate date) {
        try {
            StockPrice stockPrice = stockPriceGetService.getStockPriceByDate(stockId, date);
            return stockPrice.getClosePrice().multiply(BigDecimal.valueOf(quantity));
        } catch (Exception e) {
            // 주식 가격이 없는 경우 0으로 처리
            return BigDecimal.ZERO;
        }
    }

}
