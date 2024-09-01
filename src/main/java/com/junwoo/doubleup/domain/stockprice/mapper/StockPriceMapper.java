package com.junwoo.doubleup.domain.stockprice.mapper;

import com.junwoo.doubleup.domain.stockprice.StockPrice;
import com.junwoo.doubleup.domain.stockprice.dto.StockPriceResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StockPriceMapper {

	StockPriceMapper INSTANCE = Mappers.getMapper(StockPriceMapper.class);

	// StockPrice 엔티티를 StockPriceResponse DTO로 변환
	StockPriceResponse toResponse(StockPrice stockPrice);
}
