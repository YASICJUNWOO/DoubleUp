package com.junwoo.doubleup.domain.portfolio.mapper;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioBaseResponse;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioDetailResponse;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import java.math.BigDecimal;
import java.util.Map;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-17T18:57:13+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class PortfolioMapperImpl implements PortfolioMapper {

    @Override
    public Portfolio toEntity(Member member, PortfolioAddRequest portfolioAddRequest) {
        if ( member == null && portfolioAddRequest == null ) {
            return null;
        }

        Portfolio.PortfolioBuilder portfolio = Portfolio.builder();

        if ( portfolioAddRequest != null ) {
            portfolio.name( portfolioAddRequest.getName() );
        }
        portfolio.member( member );

        return portfolio.build();
    }

    @Override
    public PortfolioBaseResponse toBaseResponse(Portfolio portfolio) {
        if ( portfolio == null ) {
            return null;
        }

        PortfolioBaseResponse.PortfolioBaseResponseBuilder portfolioBaseResponse = PortfolioBaseResponse.builder();

        portfolioBaseResponse.totalInvestmentAmount( calculateTotalAmount( portfolio ) );
        portfolioBaseResponse.id( portfolio.getId() );
        portfolioBaseResponse.name( portfolio.getName() );

        return portfolioBaseResponse.build();
    }

    @Override
    public PortfolioDetailResponse toResponse(Portfolio portfolio, Map<String, BigDecimal> currentPrices) {
        if ( portfolio == null ) {
            return null;
        }

        PortfolioDetailResponse portfolioDetailResponse = new PortfolioDetailResponse();

        portfolioDetailResponse.setPortfolioStocks( mapStocksToResponsesWithPrices( portfolio.getPortfolioStocks(), currentPrices ) );
        if ( portfolio != null ) {
            portfolioDetailResponse.setTotalInvestmentAmount( calculateTotalAmount( portfolio ).toString() );
        }
        portfolioDetailResponse.setMemberName( portfolioMemberName( portfolio ) );
        portfolioDetailResponse.setId( portfolio.getId() );
        portfolioDetailResponse.setName( portfolio.getName() );

        return portfolioDetailResponse;
    }

    @Override
    public PortfolioDetailResponse.PortfolioStockResponse toStockResponse(PortfolioStock portfolioStock, BigDecimal currentPrice) {
        if ( portfolioStock == null ) {
            return null;
        }

        PortfolioDetailResponse.PortfolioStockResponse portfolioStockResponse = new PortfolioDetailResponse.PortfolioStockResponse();

        if ( portfolioStock != null ) {
            portfolioStockResponse.setInvestmentAmount( calculateStockTotalAmount( portfolioStock ).toString() );
        }
        if ( portfolioStock != null ) {
            portfolioStockResponse.setRatio( calculateRatio( portfolioStock ).toString() );
        }
        portfolioStockResponse.setCurrentAmount( calculateCurrentValue( portfolioStock, currentPrice ) );
        portfolioStockResponse.setProfitAndLoss( calculateProfitAndLoss( portfolioStock, currentPrice ) );
        portfolioStockResponse.setProfitAndLossRate( calculateStockProfitAndLossRate( portfolioStock, currentPrice ) );
        portfolioStockResponse.setId( portfolioStock.getId() );
        portfolioStockResponse.setStock( portfolioStock.getStock() );
        portfolioStockResponse.setQuantity( portfolioStock.getQuantity() );
        if ( portfolioStock.getAveragePrice() != null ) {
            portfolioStockResponse.setAveragePrice( portfolioStock.getAveragePrice().toString() );
        }

        portfolioStockResponse.setCurrentPrice( currentPrice );

        return portfolioStockResponse;
    }

    private String portfolioMemberName(Portfolio portfolio) {
        Member member = portfolio.getMember();
        if ( member == null ) {
            return null;
        }
        return member.getName();
    }
}
