package com.junwoo.doubleup.domain.stockprice;

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
	private final StockPriceMapper stockPriceMapper = StockPriceMapper.INSTANCE;

	@GetMapping("/date")
	public StockPriceResponse getStockPricesByStock(@RequestParam Long stockId, @RequestParam LocalDate date) {
		StockPrice stockPrice = stockPriceGetService.getStockPriceByDate(stockId, date);
		return stockPriceMapper.toResponse(stockPrice);
	}

	@GetMapping
	public List<StockPriceResponse> getStockPricesByStock(@RequestParam Long stockId,
														  @RequestParam PeriodType periodType) {
		List<StockPrice> stockPrices = stockPriceGetService.getStockPrices(stockId, periodType);
		return stockPrices.stream()
			.map(stockPriceMapper::toResponse)
			.toList();
	}

}
