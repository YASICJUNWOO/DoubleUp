package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.domain.stockprice.repository.StockPriceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Component
@RequiredArgsConstructor
public class StockPriceDataInitializer implements DataInitializer {

	private final StockPriceRepository stockPriceRepository;

	private final StockRepository stockRepository;

	// 랜덤값 생성 메서드
	public static BigDecimal getRandomPrice(double min, double max) {
		Random random = new Random();
		return BigDecimal.valueOf(min + (max - min) * random.nextDouble()).setScale(2, BigDecimal.ROUND_HALF_UP);
	}

	private Long getRandomVolume(int min, int max) {
		Random random = new Random();
		return (long) (min + random.nextInt(max - min + 1));
	}

	// StockPrice 생성 메서드
	private StockPrice createStockPrice(Stock stock, LocalDate date, BigDecimal openPrice, BigDecimal closePrice, BigDecimal highPrice, BigDecimal lowPrice, Long volume) {
		return StockPrice.builder()
				.stock(stock)
				.date(date)
				.openPrice(openPrice)
				.closePrice(closePrice)
				.highPrice(highPrice)
				.lowPrice(lowPrice)
				.volume(volume)
				.build();
	}

	@Override
	public void init() {

		Stock stock = stockRepository.findById(1L).orElseThrow(() -> new IllegalArgumentException("해당 주식이 존재하지 않습니다."));

		List<StockPrice> stockPrices = new ArrayList<>();

		for (int i = 0; i < 50; i++) {
			LocalDate date = LocalDate.now().minusDays(i); // 과거 날짜

			// 랜덤 가격 생성
			BigDecimal openPrice = getRandomPrice(100.00, 150.00);
			BigDecimal closePrice = getRandomPrice(100.00, 150.00);
			BigDecimal highPrice = getRandomPrice(closePrice.doubleValue(), 160.00); // 종가보다 높게 설정
			BigDecimal lowPrice = getRandomPrice(90.00, openPrice.doubleValue()); // 시가보다 낮게 설정
			Long volume = getRandomVolume(100000000, 150000000); // 랜덤 거래량

			// StockPrice 객체 생성
			StockPrice stockPrice = createStockPrice(stock, date, openPrice, closePrice, highPrice, lowPrice, volume);
			stockPrices.add(stockPrice);
		}

		if (stockPriceRepository.count() == 0) {
			stockPriceRepository.saveAll(stockPrices);
		}
	}

}
