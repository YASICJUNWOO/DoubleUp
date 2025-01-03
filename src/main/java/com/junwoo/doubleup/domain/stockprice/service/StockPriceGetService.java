package com.junwoo.doubleup.domain.stockprice.service;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.service.StockGetService;
import com.junwoo.doubleup.domain.stockprice.dto.PeriodType;
import com.junwoo.doubleup.domain.stockprice.dto.StockPriceResponse;
import com.junwoo.doubleup.domain.stockprice.dto.mapper.StockPriceMapper;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.domain.stockprice.repository.StockPriceRepository;
import com.junwoo.doubleup.domain.stockprice.repository.TodayStockPriceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class StockPriceGetService {

	private final StockPriceRepository stockPriceRepository;
	private final TodayStockPriceRepository todayStockPriceRepository;
	private final StockPriceMapper stockPriceMapper = StockPriceMapper.INSTANCE;
	private final StockGetService stockGetService;

	@Transactional(readOnly = true)
	public StockPrice getStockPriceByDate(Long id, LocalDate date) {
		return stockPriceRepository.findByStock_StockIdAndDate(id, date)
			.orElseThrow(() -> new IllegalArgumentException("해당 주식 가격 데이터가 존재하지 않습니다."));
	}

	//가장 최근 날짜의 주식 가격 조회
	@Transactional(readOnly = true)
	public StockPrice getStockPriceByRecentDate(Long stockId) {
		return stockPriceRepository.findTopByStock_StockIdOrderByDateDesc(stockId)
			.orElseThrow(() -> new IllegalArgumentException("해당 주식 가격 데이터가 존재하지 않습니다."));
	}

	public List<StockPrice> getStockPrices(Long stockId, PeriodType periodType) {
		//일단 데일리
		return stockPriceRepository.findByStock_StockIdOrderByDateAsc(stockId);
	}

	public List<StockPriceResponse> getTodayStockPriceList() {
		List<Long> all = stockGetService.findAll().stream().map(Stock::getStockId).toList();
        return all.stream().map(this::getTodayStockPriceByStock).toList();
	}

	public StockPriceResponse getTodayStockPriceByStock(Long stockId) {
		Stock stock = stockGetService.findById(stockId);
		StockPrice todayStockPrice = todayStockPriceRepository.getTodayStockPrice(stock.getSymbol())
				.orElseGet(() -> {
					try {
						return getStockPriceByRecentDate(stock.getStockId());
					}
					catch (IllegalArgumentException e) {
						log.error("Failed to get today stock price by stock", e);
						return null;
					}
				});

		return stockPriceMapper.toStockPriceResponse(stock, todayStockPrice);
	}


	public StockPriceResponse getStockPricesByStock(Stock stock, LocalDate date) {
		StockPrice stockPrice = getStockPriceByDate(stock.getStockId(), date);
		return stockPriceMapper.toStockPriceResponse(stock, stockPrice);
	}
}
