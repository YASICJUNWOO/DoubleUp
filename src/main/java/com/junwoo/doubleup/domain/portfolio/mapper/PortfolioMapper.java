package com.junwoo.doubleup.domain.portfolio.mapper;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioBaseResponse;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioDetailResponse;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

@Mapper
public interface PortfolioMapper {

	PortfolioMapper INSTANCE = Mappers.getMapper(PortfolioMapper.class);

	@Mapping(target = "name", source = "portfolioAddRequest.name")
	@Mapping(target = "portfolioStocks", ignore = true)
	@Mapping(target = "id", ignore = true)
	Portfolio toEntity(Member member, PortfolioAddRequest portfolioAddRequest);

	// 기본 portfolio
	@Mapping(target = "totalAmount", source = "portfolio", qualifiedByName = "calculatePortfolioTotalAmount")
	PortfolioBaseResponse toBaseResponse(Portfolio portfolio);

	// 상세 portfolio
	@Mapping(target = "portfolioStocks", source = "portfolio.portfolioStocks", qualifiedByName = "mapStocksToResponsesWithPrices")
	@Mapping(target = "totalAmount", source = "portfolio", qualifiedByName = "calculatePortfolioTotalAmount")
	@Mapping(target = "memberName", source = "portfolio.member.name")
	PortfolioDetailResponse toResponse(Portfolio portfolio, @Context Map<String, BigDecimal> currentPrices);

	// 주식 목록 응답으로 변환 (현재가 포함)
	@Named("mapStocksToResponsesWithPrices")
	default List<PortfolioDetailResponse.PortfolioStockResponse> mapStocksToResponsesWithPrices(List<PortfolioStock> portfolioStocks, @Context Map<String, BigDecimal> currentPrices) {
		return portfolioStocks.stream()
				.map(portfolioStock -> {
					BigDecimal currentPrice = currentPrices.get(portfolioStock.getStock().getSymbol());
					return toStockResponse(portfolioStock, currentPrice);
				})
				.toList();
	}

	// 총 금액 계산
	@Named("calculatePortfolioTotalAmount")
	default BigDecimal calculateTotalAmount(Portfolio portfolio) {
		return portfolio.getPortfolioStocks().stream()
				.map(this::calculateStockTotalAmount)
				.reduce(BigDecimal.ZERO, BigDecimal::add);
	}

	/*
	 * currentPrice는 PortfolioStock 엔티티에 존재하는 필드가 아니라
	 * @Context로 전달된 값이므로 직접 매핑하지 않고 expression을 사용해야 합니다.
	 */
	// 상세 portfolio의 개별 주식
	@Mapping(target = "currentPrice", expression = "java(currentPrice)")
	@Mapping(target = "totalAmount", source = "portfolioStock", qualifiedByName = "calculateStockTotalAmount")
	@Mapping(target = "ratio", source = "portfolioStock", qualifiedByName = "calculateRatio")
	@Mapping(target = "currentValue", source = "portfolioStock", qualifiedByName = "calculateCurrentValue")
	@Mapping(target = "profitAndLoss", source = "portfolioStock", qualifiedByName = "calculateProfitAndLoss")
	@Mapping(target = "profitAndLossRate", source = "portfolioStock", qualifiedByName = "calculateStockProfitAndLossRate")
	PortfolioDetailResponse.PortfolioStockResponse toStockResponse(PortfolioStock portfolioStock, @Context BigDecimal currentPrice);

	// 주식 비율 계산
	@Named("calculateRatio")
	default BigDecimal calculateRatio(PortfolioStock portfolioStock) {
		Portfolio portfolio = portfolioStock.getPortfolio();
		BigDecimal portfolioTotalAmount = calculateTotalAmount(portfolio);

		if (portfolioTotalAmount.compareTo(BigDecimal.ZERO) > 0) {
			return calculateStockTotalAmount(portfolioStock).divide(portfolioTotalAmount, 4, RoundingMode.HALF_UP);
		} else {
			return BigDecimal.ZERO;
		}
	}

	@Named("calculateCurrentValue")
	default BigDecimal calculateCurrentValue(PortfolioStock portfolioStock, @Context BigDecimal currentPrice) {
		return currentPrice.multiply(BigDecimal.valueOf(portfolioStock.getQuantity()));
	}

	@Named("calculateProfitAndLoss")
	default BigDecimal calculateProfitAndLoss(PortfolioStock portfolioStock, @Context BigDecimal currentPrice) {
		BigDecimal currentValue = calculateCurrentValue(portfolioStock, currentPrice);
		BigDecimal totalAmount = calculateStockTotalAmount(portfolioStock);
		return currentValue.subtract(totalAmount);
	}

	@Named("calculateStockProfitAndLossRate")
	default BigDecimal calculateStockProfitAndLossRate(PortfolioStock portfolioStock, @Context BigDecimal currentPrice) {
		BigDecimal profitAndLoss = calculateProfitAndLoss(portfolioStock, currentPrice);
		BigDecimal totalAmount = calculateStockTotalAmount(portfolioStock);
		if (totalAmount.compareTo(BigDecimal.ZERO) > 0) {
			return profitAndLoss.divide(totalAmount, 4, RoundingMode.HALF_UP);
		} else {
			return BigDecimal.ZERO;
		}
	}

	@Named("calculateStockTotalAmount")
	default BigDecimal calculateStockTotalAmount(PortfolioStock portfolioStock) {
		return portfolioStock.getAveragePrice().multiply(BigDecimal.valueOf(portfolioStock.getQuantity()));
	}

}
