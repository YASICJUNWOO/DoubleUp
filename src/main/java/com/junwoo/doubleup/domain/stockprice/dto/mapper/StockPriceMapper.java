package com.junwoo.doubleup.domain.stockprice.dto.mapper;

import com.junwoo.doubleup.domain.stock.dto.response.StockResponse;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.dto.StockPriceResponse;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.math.BigDecimal;

@Mapper
public interface StockPriceMapper {

	StockPriceMapper INSTANCE = Mappers.getMapper(StockPriceMapper.class);

	// StockPrice 엔티티를 StockPriceResponse DTO로 변환
	StockPriceResponse toResponse(StockPrice stockPrice);

	// StockPrice가 null일 경우 Stock 정보만 채운 StockPriceResponse 반환
	default StockPriceResponse toResponseWithNull(Stock stock, StockPrice stockPrice) {

		// Stock 정보만 설정
		StockPriceResponse response = StockPriceResponse.builder()
				.stock(StockResponse.builder()
						.stockId(stock.getStockId())
						.symbol(stock.getSymbol())
						.name(stock.getName())
						.market(stock.getMarket())
						.stockType(stock.getStockType())
						.build())
				.build();

		// stockPrice가 null이 아닌 경우 나머지 필드도 설정
		if (stockPrice != null) {
			response.setStockPriceId(stockPrice.getStockPriceId());
			response.setDate(stockPrice.getDate());
			response.setOpenPrice(stockPrice.getOpenPrice());
			response.setClosePrice(stockPrice.getClosePrice());
			response.setHighPrice(stockPrice.getHighPrice());
			response.setLowPrice(stockPrice.getLowPrice());
			response.setVolume(stockPrice.getVolume());
		}

		return response;
	}

	StockPriceResponse toStockPriceResponse(Stock stock, StockPrice todayPrice, BigDecimal currentPrice, BigDecimal priceChange, BigDecimal priceChangeRate);

}
