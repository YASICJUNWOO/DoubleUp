package com.junwoo.doubleup.domain.portfolio.controller;

import com.junwoo.doubleup.domain.member.service.MemberGetService;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioMapper;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioStockMapper;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioGetService;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioService;
import com.junwoo.doubleup.domain.stock.StockGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

	@GetMapping("/all")
	private List<Portfolio> findAll() {
		return portfolioGetService.findAll();
	}

	@GetMapping("/{id}")
	private Portfolio findById(@PathVariable(name = "id") Long id) {
		return portfolioGetService.findById(id);
	}

	@PostMapping
	private Portfolio save(@RequestBody PortfolioAddRequest portfolioAddRequest) {
		return portfolioService.addPortfolio(portfolioAddRequest);
	}

	@DeleteMapping("/{id}")
	private void delete(@PathVariable(name = "id") Long id) {
		portfolioGetService.delete(id);
	}

}
