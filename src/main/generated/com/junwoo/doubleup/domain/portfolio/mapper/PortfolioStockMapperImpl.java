package com.junwoo.doubleup.domain.portfolio.mapper;

import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-17T18:57:13+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class PortfolioStockMapperImpl implements PortfolioStockMapper {

    @Override
    public PortfolioStock toEntity(Stock stock, PortfolioAddRequest.PortfolioStockAddRequest portfolioStockAddRequest) {
        if ( stock == null && portfolioStockAddRequest == null ) {
            return null;
        }

        PortfolioStock.PortfolioStockBuilder portfolioStock = PortfolioStock.builder();

        if ( portfolioStockAddRequest != null ) {
            portfolioStock.quantity( portfolioStockAddRequest.getQuantity() );
            portfolioStock.averagePrice( BigDecimal.valueOf( portfolioStockAddRequest.getAveragePrice() ) );
        }
        portfolioStock.stock( stock );

        return portfolioStock.build();
    }
}
