package com.junwoo.doubleup.outapi.csv;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class CsvMapperImpl implements CsvMapper {

    @Override
    public Stock toStock(KrStockCsv krStockCsv, Long marketCap) {
        if ( krStockCsv == null && marketCap == null ) {
            return null;
        }

        Stock.StockBuilder stock = Stock.builder();

        if ( krStockCsv != null ) {
            stock.symbol( krStockCsv.getShortCode() );
            stock.name( krStockCsv.getStockShortNameKor() );
            stock.nameEng( krStockCsv.getStockNameEng() );
            stock.market( krStockCsv.getMarketType() );
            stock.stockType( mapStockType( krStockCsv.getStockType() ) );
        }
        stock.marketCap( marketCap );

        return stock.build();
    }

    @Override
    public StockPrice toStockPrice(KrStockPriceCsv krStockPriceCsv) {
        if ( krStockPriceCsv == null ) {
            return null;
        }

        StockPrice.StockPriceBuilder stockPrice = StockPrice.builder();

        stockPrice.date( krStockPriceCsv.getDate() );
        if ( krStockPriceCsv.getOpenPrice() != null ) {
            stockPrice.openPrice( new BigDecimal( krStockPriceCsv.getOpenPrice() ) );
        }
        if ( krStockPriceCsv.getClosePrice() != null ) {
            stockPrice.closePrice( new BigDecimal( krStockPriceCsv.getClosePrice() ) );
        }
        if ( krStockPriceCsv.getPriceChangeRate() != null ) {
            stockPrice.priceChangeRate( Double.parseDouble( krStockPriceCsv.getPriceChangeRate() ) );
        }
        if ( krStockPriceCsv.getPriceChange() != null ) {
            stockPrice.priceChange( new BigDecimal( krStockPriceCsv.getPriceChange() ) );
        }
        if ( krStockPriceCsv.getHighPrice() != null ) {
            stockPrice.highPrice( new BigDecimal( krStockPriceCsv.getHighPrice() ) );
        }
        if ( krStockPriceCsv.getLowPrice() != null ) {
            stockPrice.lowPrice( new BigDecimal( krStockPriceCsv.getLowPrice() ) );
        }
        if ( krStockPriceCsv.getVolume() != null ) {
            stockPrice.volume( Long.parseLong( krStockPriceCsv.getVolume() ) );
        }

        return stockPrice.build();
    }
}
