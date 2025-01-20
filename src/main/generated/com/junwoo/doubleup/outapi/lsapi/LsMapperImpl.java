package com.junwoo.doubleup.outapi.lsapi;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-17T18:57:13+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class LsMapperImpl implements LsMapper {

    @Override
    public Stock toStock(KrStockDto.Stock dto) {
        if ( dto == null ) {
            return null;
        }

        Stock.StockBuilder stock = Stock.builder();

        stock.symbol( dto.getShcode() );
        stock.name( dto.getHname() );
        stock.nameEng( dto.getExpcode() );
        stock.market( mapMarketType( dto.getGubun() ) );
        stock.stockType( mapStockType( dto.getEtfgubun() ) );

        return stock.build();
    }

    @Override
    public StockPrice toStockPrice(LsStockPriceResponse.Result result) {
        if ( result == null ) {
            return null;
        }

        StockPrice.StockPriceBuilder stockPrice = StockPrice.builder();

        stockPrice.stock( resultToStock( result ) );
        stockPrice.openPrice( BigDecimal.valueOf( result.getOpen() ) );
        stockPrice.highPrice( BigDecimal.valueOf( result.getHigh() ) );
        stockPrice.currentPrice( BigDecimal.valueOf( result.getPrice() ) );
        stockPrice.lowPrice( BigDecimal.valueOf( result.getLow() ) );
        stockPrice.priceChange( BigDecimal.valueOf( result.getChange() ) );
        stockPrice.volume( (long) result.getVolume() );

        stockPrice.priceChangeRate( Double.parseDouble(result.getDiff()) );

        return stockPrice.build();
    }

    protected Stock resultToStock(LsStockPriceResponse.Result result) {
        if ( result == null ) {
            return null;
        }

        Stock.StockBuilder stock = Stock.builder();

        stock.symbol( result.getShcode() );

        return stock.build();
    }
}
