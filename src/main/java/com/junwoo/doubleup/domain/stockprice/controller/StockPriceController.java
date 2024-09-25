package com.junwoo.doubleup.domain.stockprice.controller;

import com.junwoo.doubleup.config.StockPriceDataInitializer;
import com.junwoo.doubleup.domain.stock.service.StockGetService;
import com.junwoo.doubleup.domain.stockprice.dto.NowPrice;
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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

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
	public List<NowPrice> findAll() {
		return stockGetService.findAll().stream()
				.map(stock -> {

					BigDecimal nowPrice = StockPriceDataInitializer.getRandomPrice(100.00, 150.00);
					//하루 전 종가
					StockPrice lastPricePrevDay = null;
					try{
						lastPricePrevDay = stockPriceGetService.getStockPriceByDate(stock.getId(), LocalDate.now().minusDays(1));
					}
					catch (Exception e){
						//todo : 전일 종가 / 가격 정보가 없을 경우
						return stockPriceMapper.toNowPrice(stock, nowPrice, BigDecimal.ZERO, BigDecimal.ZERO);
					}

					BigDecimal priceChange = nowPrice.subtract(lastPricePrevDay.getClosePrice());
					BigDecimal priceChangeRate = priceChange.divide(lastPricePrevDay.getClosePrice(), 4, BigDecimal.ROUND_HALF_UP);

					return stockPriceMapper.toNowPrice(stock, nowPrice, priceChange, priceChangeRate);
				})
				.toList();
	}

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
