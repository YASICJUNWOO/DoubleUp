package com.junwoo.doubleup.outapi.csv;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class CsvUtils {

    private static final String STOCK_KR = "stock_kr.csv";
    private static final String MARKET_CAP_KR = "market_cap_kr.csv";
    private static final String DIRECTORY_PATH = "/Users/mason/Desktop/mason/DoubleUp/data/stock/price";

    private static final CsvMapper csvMapper = CsvMapper.INSTANCE;

    // 종목 정보 CSV 파일을 읽어서 Stock 엔티티 리스트로 변환
    public static List<Stock> getStocksFromCsv() {

        List<Stock> stockList = new ArrayList<>();

        Map<String, String> stockMap = getStockMarketCapFromCsvMap();

        try (CSVReader reader = new CSVReader(new FileReader(STOCK_KR))) {
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
                stockDto.setMarketType(nextLine[6]);                 // 시장구분
                stockDto.setSecurityType(nextLine[7]);               // 증권구분
                stockDto.setAffiliation(nextLine[8]);                // 소속부
                stockDto.setStockType(nextLine[9]);                  // 주식종류
                stockDto.setFaceValue(nextLine[10]);                 // 액면가
                stockDto.setNumberOfListedStocks(nextLine[11]);// 상장주식수

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
    public static Map<String, String> getStockMarketCapFromCsvMap() {

        try (CSVReader reader = new CSVReader(new FileReader(MARKET_CAP_KR))) {
            String[] nextLine;
            Map<String, String> stockMap = new HashMap<>();

            // 첫 번째 행은 헤더이므로 건너뛰기
            reader.readNext();

            while ((nextLine = reader.readNext()) != null) {
                stockMap.put(nextLine[0], nextLine[12]);
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

                    try{
                        KrStockPriceCsv stockDto = KrStockPriceCsv.builder()
                                .date(LocalDate.parse(dateString, formatter))
                                .shortCode(nextLine[0])
                                .closePrice(nextLine[4])
                                .priceChange(nextLine[5])
                                .priceChangeRate(nextLine[6])
                                .openPrice(nextLine[7])
                                .highPrice(nextLine[8])
                                .lowPrice(nextLine[9])
                                .volume(nextLine[10])
                                .tradingValue(nextLine[11])
                                .marketCap(nextLine[12])
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
                    catch(Exception e){
                        throw new RuntimeException(path.toString());
                    }
                }
            }
        }
        catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }

        return stockPriceMap;
    }

    public static boolean existFile(String fileName){
        return Files.exists(Paths.get(DIRECTORY_PATH + "/" + fileName));
    }

    public static void makeCsvFile(String fileName){
        try {
            Files.createFile(Paths.get(DIRECTORY_PATH + "/" + fileName + ".csv"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void writeCsvFile(String fileName, List<String> data){
        try {
            Files.write(
                    Paths.get(DIRECTORY_PATH + "/" + fileName + ".csv"),
                    data,
                    StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE,
                    StandardOpenOption.APPEND
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getPastDate() throws IOException {
        DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(DIRECTORY_PATH), "*.csv");

        LocalDate date = LocalDate.now();

        for (Path path : stream) {
            String dateString = path.getFileName().toString().replace(".csv", "");
            LocalDate fileDate = LocalDate.parse(dateString, DateTimeFormatter.ofPattern("yyyyMMdd"));
            if (fileDate.isBefore(date)) {
                date = fileDate;
            }
        }

        return date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    }
}
