package com.junwoo.doubleup.domain.portfolio.mapper;

import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioStockResponse;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Mapper
public interface PortfolioStockMapper {

	PortfolioStockMapper INSTANCE = Mappers.getMapper(PortfolioStockMapper.class);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "stock", source = "stock")
	@Mapping(target = "portfolio", source = "portfolio")
	@Mapping(target = "quantity", source = "portfolioStockAddRequest.quantity")
	@Mapping(target = "averagePrice", source = "portfolioStockAddRequest.averagePrice")
	@Mapping(target = "totalAmount", expression = "java(calculateTotalAmount(portfolioStockAddRequest))")
	PortfolioStock toEntity(
			Stock stock,
			Portfolio portfolio,
			PortfolioAddRequest.PortfolioStockAddRequest portfolioStockAddRequest);

	default BigDecimal calculateTotalAmount(PortfolioAddRequest.PortfolioStockAddRequest portfolioStockAddRequest) {
		double averagePrice = portfolioStockAddRequest.getAveragePrice();
		int quantity = portfolioStockAddRequest.getQuantity();
		return BigDecimal.valueOf(averagePrice * quantity);
	}

	PortfolioStockResponse toResponse(String index, BigDecimal totalAmount);

}
