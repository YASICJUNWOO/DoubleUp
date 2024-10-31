package com.junwoo.doubleup.domain.portfolio.service;

import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.domain.stockprice.service.StockPriceGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
public class PortfolioPriceService {

    private final StockPriceGetService stockPriceGetService;

    private final PortfolioGetService portfolioGetService;

    public Map<LocalDate, BigDecimal> calculatePortfolioPrice(Long portfolioId, LocalDate startDate, LocalDate endDate) {

        Portfolio portfolio = portfolioGetService.findById(portfolioId);

        Map<LocalDate, BigDecimal> dateToValueMap = new TreeMap<>();
        LocalDate currentDate = startDate;

        // 시작 날짜부터 종료 날짜까지 하루씩 계산
        while (!currentDate.isAfter(endDate)) {
            BigDecimal totalValue = calculatePortfolioPriceByDate(portfolio, currentDate);

            if(totalValue.compareTo(BigDecimal.ZERO) != 0) {
                dateToValueMap.put(currentDate, totalValue);
            }

            currentDate = currentDate.plusDays(1);
        }

        return dateToValueMap;
    }

    // todo : 특정 날짜의 가격정보가 없을 떄 보완 가격 설정
    // 특정 날짜의 포트폴리오 총 가치 계산
    public BigDecimal calculatePortfolioPriceByDate(Portfolio portfolio, LocalDate date) {
        BigDecimal totalValue = BigDecimal.ZERO;

        for (PortfolioStock portfolioStock : portfolio.getPortfolioStocks()) {
            BigDecimal stockValue = calculateStockValue(portfolioStock.getQuantity(), portfolioStock.getStock().getStockId(), date);

            if(stockValue.compareTo(BigDecimal.ZERO) == 0) {
                return BigDecimal.ZERO;
            }
            totalValue = totalValue.add(stockValue);
        }

        return totalValue;
    }

    // 개별 주식의 총액 계산 (예외 처리 포함)
    private BigDecimal calculateStockValue(int quantity, Long stockId, LocalDate date) {
        try {
            StockPrice stockPrice = stockPriceGetService.getStockPriceByDate(stockId, date);
            return stockPrice.getClosePrice().multiply(BigDecimal.valueOf(quantity));
        } catch (Exception e) {
            // 주식 가격이 없는 경우 0으로 처리
            return BigDecimal.ZERO;
        }
    }

}
