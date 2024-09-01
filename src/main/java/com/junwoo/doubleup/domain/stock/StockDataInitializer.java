package com.junwoo.doubleup.domain.stock;

import com.junwoo.doubleup.domain.stockprice.StockPriceDataInitializer;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class StockDataInitializer {

	private final StockRepository stockRepository;
	private final StockPriceDataInitializer stockPriceInitializer;

	@PostConstruct
	public void initSampleData() {
		Stock stock1 = Stock.builder()
				.name("삼성전자")
				.symbol("005930")
				.market("KOSPI")
				.build();

		Stock stock2 = Stock.builder()
				.name("SK하이닉스")
				.symbol("000660")
				.market("KOSPI")
				.build();

		Stock stock3 = Stock.builder()
				.name("NAVER")
				.symbol("035420")
				.market("KOSPI")
				.build();

		Stock stock4 = Stock.builder()
				.name("삼성바이오로직스")
				.symbol("207940")
				.market("KOSPI")
				.build();

		Stock stock5 = Stock.builder()
				.name("카카오")
				.symbol("035720")
				.market("KOSPI")
				.build();

		if(stockRepository.count() == 0) {
			stockRepository.saveAll(List.of(stock1, stock2, stock3, stock4, stock5));
			stockRepository.flush();
		}

		log.info("Stock data initialized.");
		stockPriceInitializer.init(stockRepository.findById(1L).get());

	}

}
