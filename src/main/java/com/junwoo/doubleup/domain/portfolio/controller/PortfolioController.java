package com.junwoo.doubleup.domain.portfolio.controller;

import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioBaseResponse;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioDetailResponse;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioMapper;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioStockMapper;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioGetService;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioService;
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

	// 포트폴리오 목록 조회
	@GetMapping
	private List<PortfolioBaseResponse> findAll() {
		List<Portfolio> portfolios = portfolioGetService.findAll();
		return portfolios.stream()
				.map(portfolioMapper::toBaseResponse).toList();
	}

	// 포트폴리오 상세 조회
	@GetMapping("/{id}")
	private PortfolioDetailResponse findById(@PathVariable(name = "id") Long id) {
		Portfolio portfolio = portfolioGetService.findById(id);
		return portfolioMapper.toResponse(portfolio);
	}

	// 포트폴리오 추가
	@PostMapping
	private PortfolioDetailResponse save(@RequestBody PortfolioAddRequest portfolioAddRequest) {
		Portfolio portfolio = portfolioService.addPortfolio(portfolioAddRequest);
		return portfolioMapper.toResponse(portfolio);
	}

	// 포트폴리오 삭제
	@DeleteMapping("/{id}")
	private void delete(@PathVariable(name = "id") Long id) {
		portfolioGetService.delete(id);
	}

}
