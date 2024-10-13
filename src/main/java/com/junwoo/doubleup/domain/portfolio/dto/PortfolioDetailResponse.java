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
	private String totalAmount;
	private List<PortfolioStockResponse> portfolioStocks;

	@Getter
	@Data
	public static class PortfolioStockResponse {
		private Long id;
		private Stock stock;
		private int quantity;
		private String averagePrice;

		//계산 값
		// 총 매수 금액
		private String totalAmount;
		// 비중
		private String ratio;
		private BigDecimal currentPrice;
		private BigDecimal currentValue;

		// 손익
		private BigDecimal profitAndLoss;
		private BigDecimal profitAndLossRate;
	}

}
