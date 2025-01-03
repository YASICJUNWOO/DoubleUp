package com.junwoo.doubleup.domain.portfolio.controller;

import com.junwoo.doubleup.domain.portfolio.dto.PortfolioPriceRequest;
import com.junwoo.doubleup.domain.portfolio.dto.portfolioprice.PortfolioPriceResponse;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio-price")
@RequiredArgsConstructor
public class PortfolioStockController {

    private final PortfolioPriceService portfolioPriceService;

    @PostMapping
    public List<PortfolioPriceResponse> test(@RequestBody PortfolioPriceRequest request) {
        return portfolioPriceService.calculatePortfolioPrice(request.getPortfolioId(), request.getStartDate(), request.getEndDate());
    }

}
