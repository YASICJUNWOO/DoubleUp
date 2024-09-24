package com.junwoo.doubleup.config;

import java.math.BigDecimal;

public class PresentPriceDb {

	public static BigDecimal getRandomPrice() {
		return StockPriceDataInitializer.getRandomPrice(100.00, 150.00);
	}

}
