package com.junwoo.doubleup.domain.stock.dto.mapper;

import com.junwoo.doubleup.domain.stock.dto.response.StockResponse;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class StockMapperImpl implements StockMapper {

    @Override
    public StockResponse toResponse(Stock stock) {
        if ( stock == null ) {
            return null;
        }

        StockResponse.StockResponseBuilder stockResponse = StockResponse.builder();

        stockResponse.stockId( stock.getStockId() );
        stockResponse.symbol( stock.getSymbol() );
        stockResponse.name( stock.getName() );
        stockResponse.market( stock.getMarket() );
        stockResponse.stockType( stock.getStockType() );
        stockResponse.marketCap( stock.getMarketCap() );

        return stockResponse.build();
    }
}
