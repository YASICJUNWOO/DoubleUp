package com.junwoo.doubleup.domain.stockprice.controller;

import com.junwoo.doubleup.domain.stock.service.StockGetService;
import com.junwoo.doubleup.domain.stockprice.dto.PeriodType;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.domain.stockprice.service.StockPriceGetService;
import com.junwoo.doubleup.domain.stockprice.dto.StockPriceResponse;
import com.junwoo.doubleup.domain.stockprice.mapper.StockPriceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/stock-prices")
public class StockPriceController {

	private final StockPriceGetService stockPriceGetService;

	private final StockGetService stockGetService;
	private final StockPriceMapper stockPriceMapper = StockPriceMapper.INSTANCE;

	//날짜 별 주가 목록 조회
	@GetMapping("/all")
	public List<StockPriceResponse> findAll(@RequestParam LocalDate date) {
		return stockGetService.findAll().stream()
				.map(stock -> {
					try {
						StockPrice stockPriceByDate = stockPriceGetService.getStockPriceByDate(stock.getId(), date);
						return stockPriceMapper.toResponse(stockPriceByDate);
					} catch (Exception e) {
						return stockPriceMapper.toResponseWithNull(stock, null);
					}
				})
				.toList();
	}

	//날짜 별 개별 주가 조회
	@GetMapping("/date")
	public StockPriceResponse getStockPricesByStock(@RequestParam Long stockId, @RequestParam LocalDate date) {
		StockPrice stockPrice = stockPriceGetService.getStockPriceByDate(stockId, date);
		return stockPriceMapper.toResponse(stockPrice);
	}

	//주식 별 주가 조회
	//periodType: DAILY, WEEKLY, MONTHLY (일봉, 주볼, 월봉)
	@GetMapping
	public List<StockPriceResponse> getStockPricesByStock(@RequestParam Long stockId,
														  @RequestParam PeriodType periodType) {
		List<StockPrice> stockPrices = stockPriceGetService.getStockPrices(stockId, periodType);
		return stockPrices.stream()
				.map(stockPriceMapper::toResponse)
				.toList();
	}


}
