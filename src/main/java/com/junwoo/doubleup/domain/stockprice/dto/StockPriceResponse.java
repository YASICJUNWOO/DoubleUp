package com.junwoo.doubleup.domain.stockprice.dto;

import com.junwoo.doubleup.domain.stock.dto.response.StockResponse;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Data
public class StockPriceResponse {

	private Long stockPriceId;
	private StockResponse stock;
	private LocalDate date;

	private BigDecimal openPrice;
	private BigDecimal closePrice;
	private BigDecimal highPrice;
	private BigDecimal lowPrice;
	private Long volume;

	// 현재 주가
	private BigDecimal currentPrice;

	// 전날 대비 가격 변동
	private BigDecimal priceChange;
	private BigDecimal priceChangeRate;

}
