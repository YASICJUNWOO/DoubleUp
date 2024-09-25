package com.junwoo.doubleup.domain.stockprice.service;

import com.junwoo.doubleup.config.StockPriceDataInitializer;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.dto.PeriodType;
import com.junwoo.doubleup.domain.stockprice.dto.StockPriceResponse;
import com.junwoo.doubleup.domain.stockprice.dto.mapper.StockPriceMapper;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.domain.stockprice.repository.StockPriceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StockPriceGetService {

	private final StockPriceRepository stockPriceRepository;
	private final StockPriceMapper stockPriceMapper = StockPriceMapper.INSTANCE;

	@Transactional(readOnly = true)
	public StockPrice getStockPriceByDate(Long id, LocalDate date) {
		return stockPriceRepository.findByStock_StockIdAndDate(id, date)
			.orElseThrow(() -> new IllegalArgumentException("해당 주식 가격 데이터가 존재하지 않습니다."));
	}

	public List<StockPrice> getStockPrices(Long stockId, PeriodType periodType) {
		//일단 데일리
		return stockPriceRepository.findByStock_StockIdOrderByDateAsc(stockId);
	}


	public StockPriceResponse getStockPricesByStock(Stock stock, LocalDate date) {
		BigDecimal nowPrice = StockPriceDataInitializer.getRandomPrice(100.00, 150.00);

		StockPrice todayPrice = null;
		//하루 전 종가
		StockPrice lastPricePrevDay = null;

		try {
			todayPrice = getStockPriceByDate(stock.getStockId(), date);
			lastPricePrevDay = getStockPriceByDate(stock.getStockId(), date.minusDays(1));
		} catch (Exception e) {
			//todo : 전일 종가 / 가격 정보가 없을 경우
			return stockPriceMapper.toStockPriceResponse(stock, todayPrice, nowPrice, BigDecimal.ZERO, BigDecimal.ZERO);
		}

		BigDecimal priceChange = nowPrice.subtract(lastPricePrevDay.getClosePrice());
		BigDecimal priceChangeRate = priceChange.divide(lastPricePrevDay.getClosePrice(), 4, BigDecimal.ROUND_HALF_UP);

		return stockPriceMapper.toStockPriceResponse(stock, todayPrice, nowPrice, priceChange, priceChangeRate);
	}
}
