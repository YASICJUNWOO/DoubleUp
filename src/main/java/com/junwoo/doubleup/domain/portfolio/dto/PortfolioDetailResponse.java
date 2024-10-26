package com.junwoo.doubleup.domain.portfolio.dto;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Data
public class PortfolioDetailResponse {

	private Long id;
	private String memberName;
	private String name;
	private String totalInvestmentAmount; // 총 투자금액
	private BigDecimal totalCurrentValue; // 총 평가금액
	private List<PortfolioStockResponse> portfolioStocks;

	@Getter
	@Data
	public static class PortfolioStockResponse {
		private Long id;
		private Stock stock;
		private int quantity;

		private String ratio; // 비중
		private String averagePrice; // 평균 단가
		private String investmentAmount; // 각 주식의 투자금액
		private BigDecimal currentPrice; // 현재 가격
		private BigDecimal currentAmount; // 현재 가치

		private BigDecimal profitAndLoss; // 손익
		private BigDecimal profitAndLossRate; // 손익률

	}

}
