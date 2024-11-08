package com.junwoo.doubleup.outapi.csv;


import com.junwoo.doubleup.outapi.csv.constant.SectorMappingConstants;
import com.junwoo.doubleup.outapi.csv.dto.StockDetailInfoDto;
import com.opencsv.CSVReader;
import lombok.RequiredArgsConstructor;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class StockDetailInfoCsv {

    private static final String STOCK_DETAIL_INFO_CSV = "stock_detail_info.csv";
    private static final String MAIN_PATH = "data/stock/info";

    private static final CsvMapper csvMapper = CsvMapper.INSTANCE;

    // 종목 상세 정보 CSV 파일을 읽어서 StockDetailInfo 엔티티 리스트로 변환
    public static List<StockDetailInfoDto> getStockDetailInfoFromCsv() {

        List<StockDetailInfoDto> stockDetailInfoList = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new FileReader(MAIN_PATH + "/" + STOCK_DETAIL_INFO_CSV))) {
            String[] nextLine;

            // 첫 번째 행은 헤더이므로 건너뛰기
            reader.readNext();

            while ((nextLine = reader.readNext()) != null) {
                StockDetailInfoDto stockDetailInfoDto = StockDetailInfoDto.builder()
                        .StockSymbol(nextLine[0]) // 종목 코드
                        .sectorCode(nextLine[5]) // 섹터 코드
                        .sectorName(nextLine[6]) // 섹터 이름
                        .sectorCategory(SectorMappingConstants.findCategoryBySubSector(nextLine[6]))
                        .ceo(nextLine[13]) // 대표 이사
                        .address(nextLine[15]).build();// 주소

                stockDetailInfoList.add(stockDetailInfoDto);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return stockDetailInfoList;
    }

}