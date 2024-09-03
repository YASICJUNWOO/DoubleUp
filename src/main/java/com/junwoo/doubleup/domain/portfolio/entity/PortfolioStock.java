package com.junwoo.doubleup.domain.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.junwoo.doubleup.domain.stock.Stock;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PortfolioStock {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonIgnore
	@Comment("포트폴리오")
	@ManyToOne
	@JoinColumn(name = "portfolio_id")
	private Portfolio portfolio;

	@Comment("주식")
	@ManyToOne
	@JoinColumn(name = "stock_id", nullable = false)
	private Stock stock;

	@Comment("보유 수량")
	@Column(nullable = false)
	private int quantity;  // 보유 수량

	@Comment("매수 총 금액")
	@Column(nullable = false)
	private BigDecimal totalAmount;

	@Comment("평균 매수 가격")
	@Column(nullable = false)
	private BigDecimal averagePrice;

}
