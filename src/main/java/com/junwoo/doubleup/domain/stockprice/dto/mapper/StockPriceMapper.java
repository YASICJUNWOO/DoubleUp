package com.junwoo.doubleup.domain.stockprice.dto.mapper;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.dto.StockPriceResponse;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StockPriceMapper {

	StockPriceMapper INSTANCE = Mappers.getMapper(StockPriceMapper.class);

	// StockPrice 엔티티를 StockPriceResponse DTO로 변환
	StockPriceResponse toResponse(StockPrice stockPrice);

	@Mapping(target = "stock", source = "stock")
	StockPriceResponse toStockPriceResponse(Stock stock, StockPrice todayPrice);

}
