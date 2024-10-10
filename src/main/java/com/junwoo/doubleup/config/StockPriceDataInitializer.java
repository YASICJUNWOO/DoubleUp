package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.domain.stockprice.repository.StockPriceRepository;
import com.junwoo.doubleup.outapi.naverapi.CsvUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

	@Override
	public void init() {
		if (stockPriceRepository.count() > 0) {
			log.info("StockPrice data already exists. Skip initialization.");
			return;
		}
		else {
			Map<String, List<StockPrice>> stringListMap = CsvUtils.initStockPrice();

			for (String symbol : stringListMap.keySet()) {

				//없으면 넘어가기
				Stock stock = stockRepository.findBySymbol(symbol).orElse(null);

				if(stock != null) {
					List<StockPrice> stockPrices = stringListMap.get(symbol);
					for (StockPrice stockPrice : stockPrices) {
						stockPrice.addStock(stock);
						stockPriceRepository.save(stockPrice);
					}
				}

			}
		}

	}

}
