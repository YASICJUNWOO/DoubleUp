package com.junwoo.doubleup.domain.stock.entity;

import com.junwoo.doubleup.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Stock extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long stockId;

	@Comment("주식 심볼")
	@Column(nullable = false, unique = true)
	private String symbol;  // 주식 심볼 (예: AAPL, TSLA)

	@Comment("주식 이름")
	@Column(nullable = false)
	private String name;  // 주식 이름 (예: Apple Inc.)

	@Comment("주식 영어 이름")
	@Column(nullable = false)
	private String nameEng;  // 주식 영어 이름 (예: Apple Inc.)

	@Comment("거래소")
	@Column(nullable = false)
	private String market;  // 거래소 (예: NASDAQ)

	@Comment("시가총액")
	@Column(nullable = true)
	private Long marketCap;  // 시가총액 (예: 2,000,000,000,000)

	@Comment("타입")
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private StockType stockType;  // 타입 (예: Common Stock, ETF)

//	@OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
//	private List<StockPrice> prices = new ArrayList<>();  // 주식 가격 리스트
}
