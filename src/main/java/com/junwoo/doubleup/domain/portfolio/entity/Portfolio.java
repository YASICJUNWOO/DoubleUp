package com.junwoo.doubleup.domain.portfolio.entity;

import com.junwoo.doubleup.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Portfolio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Comment("포트폴리오 소유자")
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@Comment("포트폴리오 이름")
	@Column(nullable = false)
	private String name;  // 포트폴리오 이름

	@Comment("포트폴리오 총 금액")
	@Column(nullable = false)
	private BigDecimal totalAmount;  // 포트폴리오 총 금액

	@Setter
	@Comment("포트폴리오에 포함된 주식 리스트")
	@OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
	private List<PortfolioStock> portfolioStocks = new ArrayList<>();  // 포트폴리오에 포함된 주식 리스트

	public void calculateTotalAmount() {
		this.totalAmount = portfolioStocks.stream()
				.map(PortfolioStock::getTotalAmount)
				.reduce(BigDecimal.ZERO, BigDecimal::add);
	}
}
