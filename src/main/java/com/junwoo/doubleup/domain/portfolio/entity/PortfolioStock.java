package com.junwoo.doubleup.domain.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import jakarta.persistence.*;
import lombok.*;
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

	@Setter
	@JsonIgnore
	@Comment("포트폴리오")
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "portfolio_id")
	private Portfolio portfolio;

	@Comment("주식")
	@ManyToOne
	@JoinColumn(name = "stock_id", nullable = false)
	private Stock stock;

	@Comment("보유 수량")
	@Column(nullable = false)
	private int quantity;

	@Comment("평균 매수 가격")
	@Column(nullable = false)
	private BigDecimal averagePrice;

}
