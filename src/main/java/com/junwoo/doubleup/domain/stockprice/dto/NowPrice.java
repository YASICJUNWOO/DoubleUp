package com.junwoo.doubleup.domain.stockprice.dto;

import com.junwoo.doubleup.domain.stock.entity.StockType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;

@Builder
@Data
public class NowPrice {

	private Long id;
	private String symbol;  // 주식 심볼 (예: AAPL, TSLA)
	private String name;  // 주식 이름 (예: Apple Inc.)
	private String market;  // 거래소 (예: NASDAQ)
	private StockType stockType;  // 타입 (예: Common Stock, ETF)

	private BigDecimal currentPrice;  // 현재가
	private BigDecimal priceChange;  // 가격 변동
	private BigDecimal priceChangeRate; // 가격 변동률
}
