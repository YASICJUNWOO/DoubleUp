package com.junwoo.doubleup.outapi.naverapi;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;

import java.io.FileReader;
import java.io.FileWriter;
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
public class CsvUtils {

    private static final String STOCK_KR = "stock_kr.csv";
    private static final String MARKET_CAP_KR = "market_cap_kr.csv";
    private static final String DIRECTORY_PATH = "/Users/mason/Desktop/mason/DoubleUp/data/stock/price";

    private static final CsvMapper csvMapper = CsvMapper.INSTANCE;

    public static void writeStocksToCSV(List<NaverStockResponse.Stock> stocks, String filePath) {
        try (CSVWriter writer = new CSVWriter(new FileWriter(filePath))) {
            // 헤더 작성 (모든 필드 이름)
            String[] header = {
                    "StockType", "StockEndType", "CompareCode", "CompareText", "CompareName",
                    "NationType", "StockExchangeCode", "StockExchangeZoneId", "StockExchangeNationType",
                    "DelayTime", "StartTime", "EndTime", "ClosePriceSendTime", "StockExchangeNameKor",
                    "StockExchangeNameEng", "StockType", "NationName", "NationCode", "ReutersCode",
                    "SymbolCode", "StockName", "StockNameEng", "ReutersIndustryCode", "IndustryCode",
                    "IndustryGroupKor", "OpenPrice", "ClosePrice", "CompareToPreviousClosePrice",
                    "FluctuationsRatio", "ExecutedVolume", "AccumulatedTradingVolume",
                    "AccumulatedTradingValue", "AccumulatedTradingValueKrwHangeul", "LocalTradedAt",
                    "MarketStatus", "MarketValue", "MarketValueHangeul", "MarketValueKrwHangeul",
                    "CurrencyCode", "CurrencyText", "CurrencyName", "Dividend", "DividendPayAt",
                    "TradeStopCode", "TradeStopText", "TradeStopName", "EndUrl", "DelayTimeName",
                    "StockEndUrl"
            };
            writer.writeNext(header);

            // 데이터 작성
            for (NaverStockResponse.Stock stock : stocks) {
                String[] data = {
                        stock.getStockType(),
                        stock.getStockEndType(),
                        stock.getCompareToPreviousPrice() != null ? stock.getCompareToPreviousPrice().getCode() : "",
                        stock.getCompareToPreviousPrice() != null ? stock.getCompareToPreviousPrice().getText() : "",
                        stock.getCompareToPreviousPrice() != null ? stock.getCompareToPreviousPrice().getName() : "",
                        stock.getNationType(),
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getCode() : "",
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getZoneId() : "",
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getNationType() : "",
                        stock.getStockExchangeType() != null ? String.valueOf(stock.getStockExchangeType().getDelayTime()) : "",
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getStartTime() : "",
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getEndTime() : "",
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getClosePriceSendTime() : "",
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getNameKor() : "",
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getNameEng() : "",
                        stock.getStockType(),
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getNationName() : "",
                        stock.getStockExchangeType() != null ? stock.getStockExchangeType().getNationCode() : "",
                        stock.getReutersCode(),
                        stock.getSymbolCode(),
                        stock.getStockName(),
                        stock.getStockNameEng(),
                        stock.getReutersIndustryCode(),
                        stock.getIndustryCodeType() != null ? stock.getIndustryCodeType().getCode() : "",
                        stock.getIndustryCodeType() != null ? stock.getIndustryCodeType().getIndustryGroupKor() : "",
                        stock.getOpenPrice(),
                        stock.getClosePrice(),
                        stock.getCompareToPreviousClosePrice(),
                        stock.getFluctuationsRatio(),
                        stock.getExecutedVolume(),
                        stock.getAccumulatedTradingVolume(),
                        stock.getAccumulatedTradingValue(),
                        stock.getAccumulatedTradingValueKrwHangeul(),
                        stock.getLocalTradedAt(),
                        stock.getMarketStatus(),
                        stock.getMarketValue(),
                        stock.getMarketValueHangeul(),
                        stock.getMarketValueKrwHangeul(),
                        stock.getCurrencyType() != null ? stock.getCurrencyType().getCode() : "",
                        stock.getCurrencyType() != null ? stock.getCurrencyType().getText() : "",
                        stock.getCurrencyType() != null ? stock.getCurrencyType().getName() : "",
                        stock.getDividend(),
                        stock.getDividendPayAt(),
                        stock.getTradeStopType() != null ? stock.getTradeStopType().getCode() : "",
                        stock.getTradeStopType() != null ? stock.getTradeStopType().getText() : "",
                        stock.getTradeStopType() != null ? stock.getTradeStopType().getName() : "",
                        stock.getEndUrl(),
                        stock.getDelayTimeName(),
                        stock.getStockEndUrl()
                };
                writer.writeNext(data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static List<NaverStockResponse.Stock> readStocksFromCSV(String filePath) {
        List<NaverStockResponse.Stock> stocks = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            String[] nextLine;

            // 첫 번째 행은 헤더이므로 건너뛰기
            reader.readNext();

            while ((nextLine = reader.readNext()) != null) {
                NaverStockResponse.Stock stock = new NaverStockResponse.Stock();
                stock.setStockType(nextLine[0]);
                stock.setStockEndType(nextLine[1]);

                if (nextLine[2] != null && !nextLine[2].isEmpty()) {
                    NaverStockResponse.Stock.CompareToPreviousPrice compareToPreviousPrice = new NaverStockResponse.Stock.CompareToPreviousPrice();
                    compareToPreviousPrice.setCode(nextLine[2]);
                    compareToPreviousPrice.setText(nextLine[3]);
                    compareToPreviousPrice.setName(nextLine[4]);
                    stock.setCompareToPreviousPrice(compareToPreviousPrice);
                }

                stock.setNationType(nextLine[5]);

                if (nextLine[6] != null && !nextLine[6].isEmpty()) {
                    NaverStockResponse.Stock.StockExchangeType stockExchangeType = new NaverStockResponse.Stock.StockExchangeType();
                    stockExchangeType.setCode(nextLine[6]);
                    stockExchangeType.setZoneId(nextLine[7]);
                    stockExchangeType.setNationType(nextLine[8]);
                    stockExchangeType.setDelayTime(Integer.parseInt(nextLine[9]));
                    stockExchangeType.setStartTime(nextLine[10]);
                    stockExchangeType.setEndTime(nextLine[11]);
                    stockExchangeType.setClosePriceSendTime(nextLine[12]);
                    stockExchangeType.setNameKor(nextLine[13]);
                    stockExchangeType.setNameEng(nextLine[14]);
                    stockExchangeType.setNationName(nextLine[15]);
                    stockExchangeType.setNationCode(nextLine[16]);
                    stock.setStockExchangeType(stockExchangeType);
                }

                stock.setReutersCode(nextLine[17]);
                stock.setSymbolCode(nextLine[18]);
                stock.setStockName(nextLine[19]);
                stock.setStockNameEng(nextLine[20]);
                stock.setReutersIndustryCode(nextLine[21]);

                if (nextLine[22] != null && !nextLine[22].isEmpty()) {
                    NaverStockResponse.Stock.IndustryCodeType industryCodeType = new NaverStockResponse.Stock.IndustryCodeType();
                    industryCodeType.setCode(nextLine[22]);
                    industryCodeType.setIndustryGroupKor(nextLine[23]);
                    stock.setIndustryCodeType(industryCodeType);
                }

                stock.setOpenPrice(nextLine[24]);
                stock.setClosePrice(nextLine[25]);
                stock.setCompareToPreviousClosePrice(nextLine[26]);
                stock.setFluctuationsRatio(nextLine[27]);
                stock.setExecutedVolume(nextLine[28]);
                stock.setAccumulatedTradingVolume(nextLine[29]);
                stock.setAccumulatedTradingValue(nextLine[30]);
                stock.setAccumulatedTradingValueKrwHangeul(nextLine[31]);
                stock.setLocalTradedAt(nextLine[32]);
                stock.setMarketStatus(nextLine[33]);
                stock.setMarketValue(nextLine[34]);
                stock.setMarketValueHangeul(nextLine[35]);
                stock.setMarketValueKrwHangeul(nextLine[36]);

                if (nextLine[37] != null && !nextLine[37].isEmpty()) {
                    NaverStockResponse.Stock.CurrencyType currencyType = new NaverStockResponse.Stock.CurrencyType();
                    currencyType.setCode(nextLine[37]);
                    currencyType.setText(nextLine[38]);
                    currencyType.setName(nextLine[39]);
                    stock.setCurrencyType(currencyType);
                }

                stock.setDividend(nextLine[40]);
                stock.setDividendPayAt(nextLine[41]);

                if (nextLine[42] != null && !nextLine[42].isEmpty()) {
                    NaverStockResponse.Stock.TradeStopType tradeStopType = new NaverStockResponse.Stock.TradeStopType();
                    tradeStopType.setCode(nextLine[42]);
                    tradeStopType.setText(nextLine[43]);
                    tradeStopType.setName(nextLine[44]);
                    stock.setTradeStopType(tradeStopType);
                }

                stock.setEndUrl(nextLine[45]);
                stock.setDelayTimeName(nextLine[46]);
                stock.setStockEndUrl(nextLine[47]);

                stocks.add(stock);
            }
        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }

        return stocks;
    }


    public static List<Stock> getStocksFromCsv() {

        List<Stock> stockList = new ArrayList<>();

        Map<String, String> stockMap = getStocksFromCsvMap();

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

    public static Map<String, String> getStocksFromCsvMap() {

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
                            .closePrice(nextLine[4])
                            .priceChange(nextLine[5])
                            .priceChangeRate(nextLine[6])
                            .openPrice(nextLine[7])
                            .highPrice(nextLine[8])
                            .lowPrice(nextLine[9])
                            .priceChange(nextLine[5])
                            .priceChangeRate(nextLine[6])
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
            }
        }
        catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }

        return stockPriceMap;
    }

}
