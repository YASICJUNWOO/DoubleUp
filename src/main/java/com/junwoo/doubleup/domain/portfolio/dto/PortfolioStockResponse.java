package com.junwoo.doubleup.domain.portfolio.dto;

import com.junwoo.doubleup.domain.stock.entity.StockType;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PortfolioStockResponse {

	private String index; // stock or stockType
	private int totalAmount;

}
