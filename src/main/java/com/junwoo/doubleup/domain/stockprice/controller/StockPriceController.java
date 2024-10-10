package com.junwoo.doubleup.domain.stockprice.controller;

import com.junwoo.doubleup.config.StockPriceDataInitializer;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.service.StockGetService;
import com.junwoo.doubleup.domain.stockprice.dto.PeriodType;
import com.junwoo.doubleup.domain.stockprice.dto.StockPriceResponse;
import com.junwoo.doubleup.domain.stockprice.dto.mapper.StockPriceMapper;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.domain.stockprice.service.StockPriceGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/stock-prices")
public class StockPriceController {

	private final StockPriceGetService stockPriceGetService;

	private final StockGetService stockGetService;
	private final StockPriceMapper stockPriceMapper = StockPriceMapper.INSTANCE;

	//현재 주가 조회
	//실시간에서 주로 사용
	@GetMapping("/now")
	public List<StockPriceResponse> findAll() {
		return stockGetService.findAll().stream()
				.map(stock -> stockPriceGetService.getStockPricesByStock(stock, LocalDate.now()))
				.toList();
	}

	//날짜 별 개별 주가 조회
	@GetMapping("/date")
	public StockPriceResponse getStockPricesByStock(@RequestParam Long stockId, @RequestParam LocalDate date) {
		Stock stock = stockGetService.findById(stockId);
		return stockPriceGetService.getStockPricesByStock(stock, date);
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
