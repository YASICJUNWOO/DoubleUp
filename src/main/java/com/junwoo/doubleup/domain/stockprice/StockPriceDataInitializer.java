package com.junwoo.doubleup.domain.stockprice;

import com.junwoo.doubleup.domain.stock.Stock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class StockPriceDataInitializer {

	private final StockPriceRepository stockPriceRepository;

	public void init(Stock stock) {
		StockPrice stockPrice1 = StockPrice.builder()
				.stock(stock)
				.date(LocalDate.of(2021, 1, 1))
				.openPrice(new BigDecimal("132.69"))
				.closePrice(new BigDecimal("132.69"))
				.highPrice(new BigDecimal("133.61"))
				.lowPrice(new BigDecimal("132.23"))
				.volume(140843759L)
				.build();

		StockPrice stockPrice2 = StockPrice.builder()
				.stock(stock)
				.date(LocalDate.of(2021, 1, 4))
				.openPrice(new BigDecimal("133.52"))
				.closePrice(new BigDecimal("129.41"))
				.highPrice(new BigDecimal("133.61"))
				.lowPrice(new BigDecimal("126.76"))
				.volume(143301887L)
				.build();

		StockPrice stockPrice3 = StockPrice.builder()
				.stock(stock)
				.date(LocalDate.of(2021, 1, 5))
				.openPrice(new BigDecimal("128.89"))
				.closePrice(new BigDecimal("131.01"))
				.highPrice(new BigDecimal("131.74"))
				.lowPrice(new BigDecimal("128.43"))
				.volume(97664898L)
				.build();

		log.info("Stock price data initialized.{}", stockPrice3);

		if (stockPriceRepository.count() == 0) {
			stockPriceRepository.saveAll(List.of(stockPrice1, stockPrice2, stockPrice3));
		}
	}

}
