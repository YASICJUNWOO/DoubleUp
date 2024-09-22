package com.junwoo.doubleup.domain.portfolio.dto;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Data
public class PortfolioResponse {

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
		private String totalAmount;
		private String averagePrice;
		private BigDecimal ratio;
	}

}
