package com.junwoo.doubleup.domain.portfolio.controller;

import com.junwoo.doubleup.domain.portfolio.dto.PortfolioPriceRequest;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio/stock")
@RequiredArgsConstructor
public class PortfolioStockController {

    private final PortfolioPriceService portfolioPriceService;

    @PostMapping("/test")
    public Map<LocalDate, BigDecimal> test(@RequestBody PortfolioPriceRequest request) {
        return portfolioPriceService.calculatePortfolioPrice(request.getPortfolioId(), request.getStartDate(), request.getEndDate());
    }
}
