package com.junwoo.doubleup.domain.portfolio.service;

import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioStockMapper;
import com.junwoo.doubleup.domain.stock.Stock;
import com.junwoo.doubleup.domain.stock.StockGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PortfolioStockService {

	private final PortfolioStockMapper portfolioStockMapper = PortfolioStockMapper.INSTANCE;

	private final StockGetService stockGetService;

	public List<PortfolioStock> createPortfolioStocks(Portfolio portfolio, List<PortfolioAddRequest.PortfolioStockAddRequest> stockAddRequests) {
		return stockAddRequests.stream()
				.map(stockAddRequest -> createPortfolioStock(portfolio, stockAddRequest))
				.toList();
	}

	public PortfolioStock createPortfolioStock(Portfolio portfolio, PortfolioAddRequest.PortfolioStockAddRequest stockAddRequest) {
		Stock stock = stockGetService.findById(stockAddRequest.getStockId());
		return portfolioStockMapper.toEntity(stock, portfolio, stockAddRequest);
	}
}
