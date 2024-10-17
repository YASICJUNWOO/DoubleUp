package com.junwoo.doubleup.outapi.naverapi;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class EtfCsvUtils {

    private static final String ETF_KR = "etf_kr.csv";
    private static final String ETF_MARKET_CAP_KR = "etf_market_cap_kr.csv";
    private static final String DIRECTORY_PATH = "/Users/mason/Desktop/mason/DoubleUp/data/etf/price";

    private static final CsvMapper csvMapper = CsvMapper.INSTANCE;

    // 종목 정보 CSV 파일을 읽어서 Stock 엔티티 리스트로 변환
    public static List<Stock> getEtfFromCsv() {

        List<Stock> stockList = new ArrayList<>();

        Map<String, String> stockMap = getEtfMarketCapFromCsvMap();

        try (CSVReader reader = new CSVReader(new FileReader(ETF_KR))) {
            String[] nextLine;

            // 첫 번째 행은 헤더이므로 건너뛰기
            reader.readNext();

            while ((nextLine = reader.readNext()) != null) {
                KrStockCsv stockDto = new KrStockCsv();
                stockDto.setStandardCode(nextLine[0]);               // 표준코드
                stockDto.setShortCode(nextLine[1]);                  // 단축코드
                stockDto.setStockNameKor(nextLine[2]);               // 한글 종목명
                stockDto.setStockShortNameKor(nextLine[3]);          // 한글 종목약명
                stockDto.setStockNameEng(nextLine[4]);               // 영문 종목명
                stockDto.setListingDate(nextLine[5]);                // 상장일
                stockDto.setMarketType("KOSPI");                     // 시장구분
                stockDto.setStockType("ETF");                  // 주식종류
                stockDto.setNumberOfListedStocks(nextLine[12]);// 상장주식수

                String marketCapString = stockMap.get(stockDto.getShortCode());
                Long marketCap = marketCapString != null ? Long.parseLong(marketCapString) : null;
                Stock stockEntity = csvMapper.toStock(stockDto, marketCap);
                stockList.add(stockEntity);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }

        return stockList;
    }

    // 시가총액 정보 CSV 파일을 읽어서 Map으로 변환
    public static Map<String, String> getEtfMarketCapFromCsvMap() {

        try (CSVReader reader = new CSVReader(new FileReader(ETF_MARKET_CAP_KR))) {
            String[] nextLine;
            Map<String, String> stockMap = new HashMap<>();

            // 첫 번째 행은 헤더이므로 건너뛰기
            reader.readNext();

            while ((nextLine = reader.readNext()) != null) {
                stockMap.put(nextLine[0], nextLine[11]);
            }

            return stockMap;
        } catch (IOException e) {
            e.printStackTrace();
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    // 주식 가격 정보 CSV 파일을 읽어서 Map으로 변환
    public static Map<String, List<StockPrice>> initStockPrice() {

        //Stock id, Stock
        Map<String, List<StockPrice>> stockPriceMap = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        try{
            DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(DIRECTORY_PATH), "*.csv");
            for (Path path : stream) {

                String dateString = path.getFileName().toString().replace(".csv", "");
                CSVReader reader = new CSVReader(new FileReader(path.toString()));

                String[] nextLine;

                // 첫 번째 행은 헤더이므로 건너뛰기
                reader.readNext();

                while ((nextLine = reader.readNext()) != null) {
                    KrStockPriceCsv stockDto = KrStockPriceCsv.builder()
                            .date(LocalDate.parse(dateString, formatter))
                            .shortCode(nextLine[0])
                            .closePrice(nextLine[2])
                            .priceChange(nextLine[3])
                            .priceChangeRate(nextLine[4])
                            .openPrice(nextLine[6])
                            .highPrice(nextLine[7])
                            .lowPrice(nextLine[8])
                            .volume(nextLine[9])
                            .marketCap(nextLine[11])
                            .build();

                    StockPrice stockPrice = csvMapper.toStockPrice(stockDto);
                    String stockIdStringValue = stockDto.getShortCode();

                    if (stockPriceMap.containsKey(stockIdStringValue)) {
                        stockPriceMap.get(stockIdStringValue).add(stockPrice);
                    } else {
                        List<StockPrice> stockList = new ArrayList<>();
                        stockList.add(stockPrice);
                        stockPriceMap.put(stockIdStringValue, stockList);
                    }
                }
            }
        }
        catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }

        return stockPriceMap;
    }

}
