package com.junwoo.doubleup.outapi.lsapi;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockType;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface LsMapper {

    LsMapper INSTANCE = Mappers.getMapper(LsMapper.class);

    // T8436OutBlock을 Stock 엔티티로 매핑
    @Mapping(source = "shcode", target = "symbol")  // 단축코드를 주식 심볼로 매핑
    @Mapping(source = "hname", target = "name")     // 종목명을 주식 이름으로 매핑
    @Mapping(source = "expcode", target = "nameEng") // 확장코드를 주식 영문 이름으로 매핑 (조정 가능)
    @Mapping(source = "gubun", target = "market", qualifiedByName = "mapMarketType") // 구분을 거래소로 매핑
    @Mapping(source = "etfgubun", target = "stockType", qualifiedByName = "mapStockType") // ETF 구분을 주식 타입으로 매핑
    Stock toStock(KrStockDto.Stock dto);

    // 거래소 구분에 따른 값을 매핑 (1: 코스피, 2: 코스닥)
    @Named("mapMarketType")
    default String mapMarketType(String gubun) {
        if ("1".equals(gubun)) {
            return "KOSPI";
        } else if ("2".equals(gubun)) {
            return "KOSDAQ";
        }
        return "UNKNOWN";
    }

    // ETF 구분에 따른 StockType 매핑 (1: ETF, 2: ETN, 그 외 일반주식)
    @Named("mapStockType")
    default StockType mapStockType(String etfgubun) {
        if ("1".equals(etfgubun)) {
            return StockType.ETF;
        }
        return StockType.COMMON;  // ETF 구분이 아니면 보통주로 처리
    }

    @Mapping(source = "shcode", target = "stock.symbol")
    @Mapping(source = "open", target = "openPrice")
    @Mapping(source = "high", target = "highPrice")
    @Mapping(source = "price", target = "currentPrice")
    @Mapping(source = "low", target = "lowPrice")
    @Mapping(target = "priceChangeRate", expression = "java(Double.parseDouble(result.getDiff()))")
    @Mapping(target = "priceChange", source = "change")
    StockPrice toStockPrice(LsStockPriceResponse.Result result);
}
