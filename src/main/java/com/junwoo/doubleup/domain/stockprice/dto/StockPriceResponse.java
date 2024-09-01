package com.junwoo.doubleup.domain.stockprice.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class StockPriceResponse {

	private Long id;

	private LocalDate date;

	private BigDecimal openPrice;

	private BigDecimal closePrice;

	private BigDecimal highPrice;

	private BigDecimal lowPrice;

	private Long volume;

}
