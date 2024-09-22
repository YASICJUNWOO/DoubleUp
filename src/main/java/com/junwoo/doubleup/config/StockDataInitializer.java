package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockType;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class StockDataInitializer implements DataInitializer {

	private final StockRepository stockRepository;
	private final StockPriceDataInitializer stockPriceInitializer;

	@Override
	@Transactional
	public void init() {
		Stock stock1 = Stock.builder()
				.id(1L)
				.name("Samsung Electronics")
				.symbol("005930")
				.market("KOSPI")
				.stockType(StockType.COMMON)
				.build();

		Stock stock2 = Stock.builder()
				.id(2L)
				.name("SKHynix")
				.symbol("000660")
				.market("KOSPI")
				.stockType(StockType.COMMON)
				.build();

		Stock stock3 = Stock.builder()
				.id(3L)
				.name("NAVER")
				.symbol("035420")
				.market("KOSPI")
				.stockType(StockType.COMMON)
				.build();

		Stock stock4 = Stock.builder()
				.id(4L)
				.name("Samsung Biologics")
				.symbol("207940")
				.market("KOSPI")
				.stockType(StockType.COMMON)
				.build();

		Stock stock5 = Stock.builder()
				.id(5L)
				.name("Kakao")
				.symbol("035720")
				.market("KOSPI")
				.stockType(StockType.COMMON)
				.build();

		Stock etf1 = Stock.builder()
				.id(6L)
				.name("TIGER 200")
				.symbol("102110")
				.market("KOSPI")
				.stockType(StockType.ETF)
				.build();

		stockRepository.saveAll(List.of(stock1, stock2, stock3, stock4, stock5, etf1));
	}

}
