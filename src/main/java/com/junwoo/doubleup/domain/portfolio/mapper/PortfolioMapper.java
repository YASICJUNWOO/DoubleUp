package com.junwoo.doubleup.domain.portfolio.mapper;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioBaseResponse;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioDetailResponse;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.math.BigDecimal;
import java.util.List;

@Mapper
public interface PortfolioMapper {

	PortfolioMapper INSTANCE = Mappers.getMapper(PortfolioMapper.class);

	@Mapping(target = "name", source = "portfolioAddRequest.name")
	@Mapping(target = "portfolioStocks", ignore = true)
	@Mapping(target = "id", ignore = true)
	Portfolio toEntity(Member member, PortfolioAddRequest portfolioAddRequest);

	// 기본 portfolio
	@Mapping(target = "totalAmount", source = "portfolio", qualifiedByName = "calculateTotalAmount")
	PortfolioBaseResponse toBaseResponse(Portfolio portfolio);

	// 상세 portfolio
	@Mapping(target = "portfolioStocks", source = "portfolio.portfolioStocks", qualifiedByName = "mapStocksToResponses")
	@Mapping(target = "totalAmount", source = "portfolio", qualifiedByName = "calculateTotalAmount")
	@Mapping(target = "memberName", source = "portfolio.member.name")
	PortfolioDetailResponse toResponse(Portfolio portfolio);

	// 상세 portfolio의 개별 주식
	@Mapping(target = "ratio", source = "portfolioStock", qualifiedByName = "calculateRatio")
	PortfolioDetailResponse.PortfolioStockResponse toStockResponse(PortfolioStock portfolioStock);

	// 주식 목록 응답으로 변환
	@Named("mapStocksToResponses")
	default List<PortfolioDetailResponse.PortfolioStockResponse> mapStocksToResponses(List<PortfolioStock> portfolioStocks) {
		return portfolioStocks.stream()
				.map(this::toStockResponse)
				.toList();
	}

	// 주식 비율 계산
	@Named("calculateRatio")
	default BigDecimal calculateRatio(PortfolioStock portfolioStock) {
		Portfolio portfolio = portfolioStock.getPortfolio();
		BigDecimal portfolioTotalAmount = calculateTotalAmount(portfolio);

		if (portfolioTotalAmount.compareTo(BigDecimal.ZERO) > 0) {
			return portfolioStock.getTotalAmount().divide(portfolioTotalAmount, 4, BigDecimal.ROUND_HALF_UP);
		} else {
			return BigDecimal.ZERO;
		}
	}

	// 총 금액 계산
	@Named("calculateTotalAmount")
	default BigDecimal calculateTotalAmount(Portfolio portfolio) {
		return portfolio.getPortfolioStocks().stream()
				.map(PortfolioStock::getTotalAmount)
				.reduce(BigDecimal.ZERO, BigDecimal::add);
	}

}
