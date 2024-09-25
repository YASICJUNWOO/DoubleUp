package com.junwoo.doubleup.domain.stockprice.entity;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StockPrice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long stockPriceId;

	@Comment("주식")
	@ManyToOne
	@JoinColumn(name = "stock_id", nullable = false)
	private Stock stock;

	@Comment("날짜")
	@Column(nullable = false)
	private LocalDate date;  // 가격 데이터의 날짜

	@Comment("시가")
	@Column(nullable = false)
	private BigDecimal openPrice;  // 시가

	@Comment("종가")
	@Column(nullable = true) // 종가는 null일 수 있음
	private BigDecimal closePrice;  // 종가

	@Comment("최고가")
	@Column(nullable = false)
	private BigDecimal highPrice;  // 최고가

	@Comment("최저가")
	@Column(nullable = false)
	private BigDecimal lowPrice;  // 최저가

	@Comment("거래량")
	@Column(nullable = false)
	private Long volume;  // 거래량
}
