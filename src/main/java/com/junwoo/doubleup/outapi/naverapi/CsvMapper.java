package com.junwoo.doubleup.outapi.naverapi;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockType;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CsvMapper {

    CsvMapper INSTANCE = Mappers.getMapper(CsvMapper.class);

    // CSV에서 읽은 데이터가 엔티티로 매핑되도록 정의
    @Mapping(source = "krStockCsv.shortCode", target = "symbol") // 단축코드를 주식 심볼로 매핑
    @Mapping(source = "krStockCsv.stockShortNameKor", target = "name") // 영문 종목명을 주식 이름으로 매핑
    @Mapping(source = "krStockCsv.stockNameEng", target = "nameEng") // 한글 종목명을 주식 영어 이름으로 매핑
    @Mapping(source = "krStockCsv.marketType", target = "market") // 시장 구분을 거래소로 매핑
    @Mapping(source = "krStockCsv.stockType", target = "stockType", qualifiedByName = "mapStockType") // 주식 타입 매핑
    @Mapping(source = "marketCap", target = "marketCap") // 시가총액 매핑
    Stock toStock(KrStockCsv krStockCsv, Long marketCap);

    // 주식 타입을 enum으로 변환하는 메서드
    @Named("mapStockType")
    default StockType mapStockType(String stockType) {

        if (stockType != null) {

            if (stockType.contains("ETF")) {
                return StockType.ETF;
            } else {
                return StockType.COMMON;
            }
        }

        return null; // 매핑이 불가능한 경우 null 반환
    }

    StockPrice toStockPrice(KrStockPriceCsv krStockPriceCsv);
}
