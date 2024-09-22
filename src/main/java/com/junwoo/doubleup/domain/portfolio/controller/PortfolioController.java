package com.junwoo.doubleup.domain.portfolio.controller;

import com.junwoo.doubleup.domain.member.service.MemberGetService;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioResponse;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioStockResponse;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioMapper;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioStockMapper;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioGetService;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioService;
import com.junwoo.doubleup.domain.stock.entity.StockType;
import com.junwoo.doubleup.domain.stock.service.StockGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

	private final PortfolioMapper portfolioMapper = PortfolioMapper.INSTANCE;
	private final PortfolioStockMapper portfolioStockMapper = PortfolioStockMapper.INSTANCE;

	private final PortfolioGetService portfolioGetService;
	private final PortfolioService portfolioService;

	private final MemberGetService memberGetService;
	private final StockGetService stockGetService;

	@GetMapping
	private List<PortfolioResponse> findAll() {
		List<Portfolio> portfolios = portfolioGetService.findAll();
		return portfolios.stream()
				.map(portfolioMapper::toResponse)
				.toList();
	}

	@GetMapping("/{id}")
	private PortfolioResponse findById(@PathVariable(name = "id") Long id) {
		Portfolio portfolio = portfolioGetService.findById(id);
		return portfolioMapper.toResponse(portfolio);
	}

	@GetMapping("/{id}/stocks")
	private List<PortfolioStockResponse> findStockByType(@PathVariable(name = "id") Long id,
														 @RequestParam(name = "type") String chartType) {
		Map<String, BigDecimal> stockByType = portfolioGetService.findStockByType(id, chartType);
		return stockByType.entrySet().stream()
				.map(entry -> portfolioStockMapper.toResponse(entry.getKey(), entry.getValue()))
				.toList();
	}

	@PostMapping
	private PortfolioResponse save(@RequestBody PortfolioAddRequest portfolioAddRequest) {
		Portfolio portfolio = portfolioService.addPortfolio(portfolioAddRequest);
		return portfolioMapper.toResponse(portfolio);
	}

	@DeleteMapping("/{id}")
	private void delete(@PathVariable(name = "id") Long id) {
		portfolioGetService.delete(id);
	}

	@DeleteMapping("/all")
	private void deleteAll() {
		portfolioGetService.deleteAll();
	}

}
