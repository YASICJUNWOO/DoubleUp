package com.junwoo.doubleup.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class TotalDataInitializer implements DataInitializer {

	private final MemberDataInitializer memberDataInitializer;
	private final StockDataInitializer stockDataInitializer;
	private final StockPriceDataInitializer stockPriceDataInitializer;

	@PostConstruct
	public void init() {
		memberDataInitializer.init();
		stockDataInitializer.init();
		stockPriceDataInitializer.init();
	}
}
