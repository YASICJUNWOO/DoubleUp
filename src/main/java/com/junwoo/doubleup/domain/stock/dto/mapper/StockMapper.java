package com.junwoo.doubleup.domain.stock.dto.mapper;

import com.junwoo.doubleup.domain.stock.dto.response.StockResponse;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import org.mapstruct.Mapper;

@Mapper
public interface StockMapper {

	StockMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(StockMapper.class);

	StockResponse toResponse(Stock stock);
}
