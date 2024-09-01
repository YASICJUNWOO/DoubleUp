package com.junwoo.doubleup.domain.stockprice;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StockPriceGetService {

	private final StockPriceRepository stockPriceRepository;

	@Transactional(readOnly = true)
	public StockPrice getStockPriceByDate(Long id, LocalDate date) {
		return stockPriceRepository.findByStockIdAndDate(id, date)
			.orElseThrow(() -> new IllegalArgumentException("해당 주식 가격 데이터가 존재하지 않습니다."));
	}

	public List<StockPrice> getStockPrices(Long stockId, PeriodType periodType) {
		//일단 데일리
		return stockPriceRepository.findByStockId(stockId);
	}
}
