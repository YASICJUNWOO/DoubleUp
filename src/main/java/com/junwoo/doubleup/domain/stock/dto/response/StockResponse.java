package com.junwoo.doubleup.domain.stock.dto.response;

import com.junwoo.doubleup.domain.stock.entity.StockType;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class StockResponse {

	private Long stockId;

	private String symbol;

	private String name;

	private String market;

	private StockType stockType;

	private Long marketCap;

}
