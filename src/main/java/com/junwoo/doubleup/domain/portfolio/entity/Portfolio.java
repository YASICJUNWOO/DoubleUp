	package com.junwoo.doubleup.domain.portfolio.entity;

	import com.fasterxml.jackson.annotation.JsonManagedReference;
	import com.junwoo.doubleup.domain.member.entity.Member;
	import jakarta.persistence.*;
	import lombok.*;
	import lombok.extern.slf4j.Slf4j;
	import org.hibernate.annotations.Comment;

	import java.util.ArrayList;
	import java.util.List;

	@Slf4j
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

		@Setter
		@Builder.Default
		@Comment("포트폴리오에 포함된 주식 리스트")
		@JsonManagedReference
		@OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
		private List<PortfolioStock> portfolioStocks = new ArrayList<>();  // 포트폴리오에 포함된 주식 리스트

		public void addPortfolioStock(List<PortfolioStock> portfolioStockS) {
			this.portfolioStocks.addAll(portfolioStockS);
			portfolioStockS.forEach(portfolioStock -> portfolioStock.setPortfolio(this));
		}

	}
