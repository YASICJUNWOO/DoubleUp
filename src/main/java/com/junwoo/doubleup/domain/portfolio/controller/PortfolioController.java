package com.junwoo.doubleup.domain.portfolio.controller;

import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioBaseResponse;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioDetailResponse;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioMapper;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioGetService;
import com.junwoo.doubleup.domain.portfolio.service.PortfolioService;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.domain.stockprice.repository.TodayStockPriceRepository;
import com.junwoo.doubleup.domain.stockprice.service.StockPriceGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

	private final PortfolioMapper portfolioMapper = PortfolioMapper.INSTANCE;

	private final PortfolioGetService portfolioGetService;
	private final PortfolioService portfolioService;

	private final StockPriceGetService stockPriceGetService;

	private final TodayStockPriceRepository todayStockPriceRepository;

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

		// 포트폴리오에 속한 주식들의 현재 가격을 조회하여 Map으로 변환
		Map<String, BigDecimal> currentPriceMap = portfolio.getPortfolioStocks().stream()
				.map(PortfolioStock::getStock)
				.collect(Collectors.toMap(Stock::getSymbol, stock ->
                        todayStockPriceRepository.getTodayStockPrice(stock.getSymbol())
                                .map(StockPrice::getCurrentPrice) // 오늘의 현재가가 있는 경우
                                .orElseGet(() -> {
                                    // 오늘의 현재가가 없는 경우 어제의 종가를 조회
                                    LocalDate yesterday = LocalDate.now().minusDays(1);
                                    return stockPriceGetService.getStockPriceByRecentDate(stock.getStockId()).getClosePrice();
                                })
				));

		return portfolioMapper.toResponse(portfolio, currentPriceMap);
	}

	// 포트폴리오 추가
	@PostMapping
	private PortfolioDetailResponse save(@RequestBody PortfolioAddRequest portfolioAddRequest) {
		Portfolio portfolio = portfolioService.addPortfolio(portfolioAddRequest);

		// 포트폴리오에 속한 주식들의 현재 가격을 조회하여 Map으로 변환
		Map<String, BigDecimal> currentPriceMap = portfolio.getPortfolioStocks().stream()
				.map(PortfolioStock::getStock)
				.collect(Collectors.toMap(Stock::getSymbol, stock ->
						todayStockPriceRepository.getTodayStockPrice(stock.getSymbol())
								.map(StockPrice::getCurrentPrice) // 오늘의 현재가가 있는 경우
								.orElseGet(() -> {
									// 오늘의 현재가가 없는 경우 어제의 종가를 조회
									LocalDate yesterday = LocalDate.now().minusDays(1);
									return stockPriceGetService.getStockPriceByDate(stock.getStockId(), yesterday).getClosePrice();
								})
				));

		return portfolioMapper.toResponse(portfolio, currentPriceMap);
	}

	// 포트폴리오 수정
	@PatchMapping("/{id}")
	public PortfolioBaseResponse update(@PathVariable(name = "id") Long id, @RequestBody PortfolioAddRequest portfolioAddRequest) {
		Portfolio portfolio = portfolioService.updatePortfolio(id, portfolioAddRequest);
		return portfolioMapper.toBaseResponse(portfolio);
	}

	// 포트폴리오 삭제
	@DeleteMapping("/{id}")
	private void delete(@PathVariable(name = "id") Long id) {
		portfolioGetService.delete(id);
	}

}
