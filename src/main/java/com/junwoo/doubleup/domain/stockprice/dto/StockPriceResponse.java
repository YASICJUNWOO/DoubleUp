package com.junwoo.doubleup.domain.stockprice.dto;

import com.junwoo.doubleup.domain.stock.dto.response.StockResponse;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class StockPriceResponse {

	private Long id;

	private StockResponse stock;

	private LocalDate date;

	private BigDecimal openPrice;

	private BigDecimal closePrice;

	private BigDecimal highPrice;

	private BigDecimal lowPrice;

	private Long volume;

}
