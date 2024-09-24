package com.junwoo.doubleup.domain.portfolio.mapper;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioResponse;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.math.BigDecimal;
import java.util.List;

@Mapper
public interface PortfolioMapper {

	PortfolioMapper INSTANCE = Mappers.getMapper(PortfolioMapper.class);

	@Mapping(target = "member", source = "member")
	@Mapping(target = "name", source = "portfolioAddRequest.name")
	@Mapping(target = "portfolioStocks", ignore = true)
	Portfolio toEntity(Member member, PortfolioAddRequest portfolioAddRequest);

	@Mapping(target = "ratio", expression = "java(calculateRatio(portfolioStock))")
	PortfolioResponse.PortfolioStockResponse toStockResponse(PortfolioStock portfolioStock);

	@Mapping(target = "portfolioStocks", expression = "java(mapStocksToResponses(portfolio.getPortfolioStocks()))")
	@Mapping(target = "memberName", source = "portfolio.member.name")
	PortfolioResponse toResponse(Portfolio portfolio);

	default BigDecimal calculateRatio(PortfolioStock portfolioStock) {
		BigDecimal portfolioTotalAmount = portfolioStock.getPortfolio().getTotalAmount();
		if (portfolioTotalAmount != null && portfolioTotalAmount.compareTo(BigDecimal.ZERO) > 0) {
			return portfolioStock.getTotalAmount().divide(portfolioTotalAmount, 4, BigDecimal.ROUND_HALF_UP);
		} else {
			return BigDecimal.ZERO;
		}
	}

	default List<PortfolioResponse.PortfolioStockResponse> mapStocksToResponses(List<PortfolioStock> portfolioStocks) {
		return portfolioStocks.stream()
				.map(this::toStockResponse)
				.toList();
	}

}
