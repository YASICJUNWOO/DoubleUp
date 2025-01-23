package com.junwoo.doubleup.domain.stockprice.dto.mapper;

import com.junwoo.doubleup.domain.stock.dto.response.StockResponse;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.dto.StockPriceResponse;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class StockPriceMapperImpl implements StockPriceMapper {

    @Override
    public StockPriceResponse toResponse(StockPrice stockPrice) {
        if ( stockPrice == null ) {
            return null;
        }

        StockPriceResponse.StockPriceResponseBuilder stockPriceResponse = StockPriceResponse.builder();

        stockPriceResponse.stockPriceId( stockPrice.getStockPriceId() );
        stockPriceResponse.stock( stockToStockResponse( stockPrice.getStock() ) );
        stockPriceResponse.date( stockPrice.getDate() );
        stockPriceResponse.openPrice( stockPrice.getOpenPrice() );
        stockPriceResponse.closePrice( stockPrice.getClosePrice() );
        stockPriceResponse.highPrice( stockPrice.getHighPrice() );
        stockPriceResponse.lowPrice( stockPrice.getLowPrice() );
        stockPriceResponse.volume( stockPrice.getVolume() );
        stockPriceResponse.currentPrice( stockPrice.getCurrentPrice() );
        stockPriceResponse.priceChange( stockPrice.getPriceChange() );
        stockPriceResponse.priceChangeRate( BigDecimal.valueOf( stockPrice.getPriceChangeRate() ) );

        return stockPriceResponse.build();
    }

    @Override
    public StockPriceResponse toStockPriceResponse(Stock stock, StockPrice todayPrice) {
        if ( stock == null && todayPrice == null ) {
            return null;
        }

        StockPriceResponse.StockPriceResponseBuilder stockPriceResponse = StockPriceResponse.builder();

        if ( todayPrice != null ) {
            stockPriceResponse.stockPriceId( todayPrice.getStockPriceId() );
            stockPriceResponse.date( todayPrice.getDate() );
            stockPriceResponse.openPrice( todayPrice.getOpenPrice() );
            stockPriceResponse.closePrice( todayPrice.getClosePrice() );
            stockPriceResponse.highPrice( todayPrice.getHighPrice() );
            stockPriceResponse.lowPrice( todayPrice.getLowPrice() );
            stockPriceResponse.volume( todayPrice.getVolume() );
            stockPriceResponse.currentPrice( todayPrice.getCurrentPrice() );
            stockPriceResponse.priceChange( todayPrice.getPriceChange() );
            stockPriceResponse.priceChangeRate( BigDecimal.valueOf( todayPrice.getPriceChangeRate() ) );
        }
        stockPriceResponse.stock( stockToStockResponse( stock ) );

        return stockPriceResponse.build();
    }

    protected StockResponse stockToStockResponse(Stock stock) {
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
