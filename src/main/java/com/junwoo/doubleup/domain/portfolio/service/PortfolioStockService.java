package com.junwoo.doubleup.domain.portfolio.service;

import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioStockMapper;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.service.StockGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PortfolioStockService {

	private final PortfolioStockMapper portfolioStockMapper = PortfolioStockMapper.INSTANCE;

	private final StockGetService stockGetService;

	@Transactional
	public List<PortfolioStock> createPortfolioStocks(List<PortfolioAddRequest.PortfolioStockAddRequest> stockAddRequests) {
		return stockAddRequests.stream()
				.map(this::createPortfolioStock)
				.toList();
	}

	public PortfolioStock createPortfolioStock(PortfolioAddRequest.PortfolioStockAddRequest stockAddRequest) {
		Stock stock = stockGetService.findById(stockAddRequest.getStockId());
		return portfolioStockMapper.toEntity(stock, stockAddRequest);
	}
}
