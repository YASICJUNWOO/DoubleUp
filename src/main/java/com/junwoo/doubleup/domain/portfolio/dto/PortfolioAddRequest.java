package com.junwoo.doubleup.domain.portfolio.dto;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;

@Getter
@Data
public class PortfolioAddRequest {

	private Long memberId;
	private String name;
	private List<PortfolioStockAddRequest> portfolioStocks = new ArrayList<>(); // 포트폴리오에 포함된 주식 리스트

	@Getter
	@Data
	public static class PortfolioStockAddRequest {
		private Long stockId;
		private int quantity;
		private double averagePrice;
	}

}
