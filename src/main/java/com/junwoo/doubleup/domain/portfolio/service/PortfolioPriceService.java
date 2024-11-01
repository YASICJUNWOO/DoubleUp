package com.junwoo.doubleup.domain.portfolio.service;

import com.junwoo.doubleup.domain.portfolio.dto.portfolioprice.PortfolioPriceResponse;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.portfolio.vo.PortfolioPriceVO;
import com.junwoo.doubleup.domain.stockprice.service.StockPriceCalculator;
import com.junwoo.doubleup.domain.stockprice.service.StockPriceGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PortfolioPriceService {

    private final StockPriceGetService stockPriceGetService;

    private final PortfolioGetService portfolioGetService;
    private final StockPriceCalculator stockPriceCalculator;

    // 특정 날짜의 포트폴리오 가치 계산
    public List<PortfolioPriceResponse> calculatePortfolioPrice(Long portfolioId, LocalDate startDate, LocalDate endDate) {

        Portfolio portfolio = portfolioGetService.findById(portfolioId);

        List<PortfolioPriceResponse> portfolioPriceResponses = new ArrayList<>();

        LocalDate currentDate = startDate;

        // 시작 날짜부터 종료 날짜까지 하루씩 계산
        while (!currentDate.isAfter(endDate)) {
            PortfolioPriceVO portfolioPriceInfo = calculatePortfolioPriceByDate(portfolio, currentDate);

            if (portfolioPriceInfo != null) {
                portfolioPriceResponses.add(PortfolioPriceResponse.builder()
                        .date(currentDate)
                        .investmentAmount(portfolioPriceInfo.getInvestmentAmount())
                        .valueAmount(portfolioPriceInfo.getValueAmount())
                        .build());
            }

            currentDate = currentDate.plusDays(1);
        }

        return portfolioPriceResponses;
    }

    // todo : 특정 날짜의 가격정보가 없을 떄 보완 가격 설정
    // 특정 날짜의 포트폴리오 총 가치 계산
    public PortfolioPriceVO calculatePortfolioPriceByDate(Portfolio portfolio, LocalDate date) {
        BigDecimal totalValue = BigDecimal.ZERO;
        BigDecimal totalInvestAmount = BigDecimal.ZERO;

        for (PortfolioStock portfolioStock : portfolio.getPortfolioStocks()) {
            BigDecimal stockValue =
                    stockPriceCalculator.calculateStockValue(portfolioStock.getQuantity(), portfolioStock.getStock().getStockId(), date);

            //todo : 추후 날짜 고려해서 계산 -> 지금은 현재 시점 기준으로 계산
            BigDecimal investAmount = stockValue.subtract(BigDecimal.valueOf(new Random().nextInt(300000)));

            if (stockValue.compareTo(BigDecimal.ZERO) == 0) {
                return null;
            }

            totalValue = totalValue.add(stockValue);
            totalInvestAmount = totalInvestAmount.add(investAmount);
        }

        return PortfolioPriceVO.builder()
                .investmentAmount(totalInvestAmount)
                .valueAmount(totalValue)
                .build();
    }

}
