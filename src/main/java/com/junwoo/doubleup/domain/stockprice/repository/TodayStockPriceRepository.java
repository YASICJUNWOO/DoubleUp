package com.junwoo.doubleup.domain.stockprice.repository;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.outapi.lsapi.LsApiService;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Repository
@RequiredArgsConstructor
public class TodayStockPriceRepository {

    public static Map<String, StockPrice> todayStockPriceRepository = new HashMap<>();

    private final String EXPORT_PATH = "data/today-stock-price.csv";

    private final StockRepository stockRepository;
    private final LsApiService lsApiService;

    @PostConstruct
    public void init() throws IOException {
        importFromCSV();
        CompletableFuture.runAsync(this::fetchStockPricesAsync);
    }

    @PreDestroy
    public void saveData() {
        try {
            exportToCSV();
        } catch (IOException e) {
            log.error("Failed to export today stock price data to CSV", e);
        }
    }

    public void update(StockPrice stockPrice) {
        todayStockPriceRepository.put(stockPrice.getStock().getSymbol(), stockPrice);
    }

    public Optional<StockPrice> getTodayStockPrice(String symbol) {
        return Optional.ofNullable(todayStockPriceRepository.get(symbol));
    }

    public void fetchStockPricesAsync() {

        while(true){
            List<Stock> all = stockRepository.findAll();

            //50개씩
            for (int i = 0; i < all.size(); i += 50) {
                log.info("i : {}", i);
                int count = 0;  // 심볼의 개수를 추적할 변수

                StringBuilder sb = new StringBuilder();

                for (int j = i; j < i + 50; j++) {
                    if (j >= all.size()) {
                        break;
                    }
                    sb.append(all.get(j).getSymbol());
                    count++;
                }

                //todo : api 호출
                Map<String, StockPrice> todayStockPrice = lsApiService.getTodayStockPrice(sb.toString(), count);
                todayStockPriceRepository.putAll(todayStockPrice);
            }
        }

    }

    public void exportToCSV() throws IOException {
        try (CSVWriter writer = new CSVWriter(new FileWriter(EXPORT_PATH))) {
            // CSV 헤더 작성
            String[] header = {"Stock Symbol", "Date", "Open Price", "Close Price", "Current Price",
                    "Price Change Rate", "Price Change", "High Price", "Low Price", "Volume"};
            writer.writeNext(header);

            // CSV 데이터 작성
            for (Map.Entry<String, StockPrice> entry : todayStockPriceRepository.entrySet()) {
                StockPrice stockPrice = entry.getValue();

                String[] row = {
                        stockPrice.getStock().getSymbol(),  // Stock Symbol
                        stockPrice.getDate() != null ? stockPrice.getDate().toString() : null , // Date
                        stockPrice.getOpenPrice().toString(),  // Open Price
                        stockPrice.getClosePrice() != null ? stockPrice.getClosePrice().toString() : "N/A",  // Close Price
                        stockPrice.getCurrentPrice() != null ? stockPrice.getCurrentPrice().toString() : "N/A",  // Current Price
                        String.valueOf(stockPrice.getPriceChangeRate()),  // Price Change Rate
                        stockPrice.getPriceChange().toString(),  // Price Change
                        stockPrice.getHighPrice().toString(),  // High Price
                        stockPrice.getLowPrice().toString(),  // Low Price
                        stockPrice.getVolume().toString()  // Volume
                };

                log.info("Exporting today stock price data: {}", row);
                writer.writeNext(row);
            }
        }
    }

    public Map<String, StockPrice> importFromCSV() {
        Map<String, StockPrice> stockPriceMap = new HashMap<>();

        log.info("기존에 저장된 TODAY STOCK PRICE 데이터를 불러옵니다.");

        try (CSVReader reader = new CSVReader(new FileReader(EXPORT_PATH))) {
            String[] line;
            boolean isFirstLine = true;

            while ((line = reader.readNext()) != null) {
                // 첫 번째 라인은 헤더이므로 건너뜁니다.
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                // CSV의 각 열을 StockPrice 객체의 필드로 매핑
                StockPrice stockPrice = StockPrice.builder()
                        .date(LocalDate.now())
                        .openPrice(new BigDecimal(line[2]))  // 시가
                        .closePrice(!line[3].equals("N/A") ? new BigDecimal(line[3]) : null)  // 종가 (null 처리)
                        .currentPrice(!line[4].equals("N/A") ? new BigDecimal(line[4]) : null)  // 현재가 (null 처리)
                        .priceChangeRate(Double.parseDouble(line[5]))  // 등락률
                        .priceChange(new BigDecimal(line[6]))  // 등락금액
                        .highPrice(new BigDecimal(line[7]))  // 최고가
                        .lowPrice(new BigDecimal(line[8]))  // 최저가
                        .volume(Long.parseLong(line[9]))  // 거래량
                        .build();

                // 맵에 저장 (Stock의 symbol을 키로 사용)
                stockPriceMap.put(line[0], stockPrice);
            }
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }
        catch (IOException e) {
            log.error("Failed to import today stock price data from CSV", e);
            return stockPriceMap;
        }

        log.info("기존의 TODAY STOCK PRICE 데이터를 성공적으로 불러왔습니다.");
        return stockPriceMap;
    }

}
