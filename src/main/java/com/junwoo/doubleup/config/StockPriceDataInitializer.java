package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import com.junwoo.doubleup.domain.stockprice.repository.StockPriceRepository;
import com.junwoo.doubleup.outapi.csv.CsvUtils;
import com.junwoo.doubleup.outapi.csv.EtfCsvUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class StockPriceDataInitializer implements DataInitializer {

    private final StockPriceRepository stockPriceRepository;

    private final StockRepository stockRepository;
    private final AsyncStockPriceService asyncStockPriceService;

    @Override
    public void init() {
        if (stockPriceRepository.count() > 0) {
            log.info("StockPrice 데이터가 이미 존재합니다. 초기화를 건너뜁니다.");

//            CompletableFuture.runAsync(() -> {
//                try {
//                    asyncStockPriceService.savePastPriceData();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                } catch (InterruptedException e) {
//                    throw new RuntimeException(e);
//                }
//            });

            return;
        }

        Map<String, List<StockPrice>> stringListMap = CsvUtils.initStockPrice();
        Map<String, List<StockPrice>> etfStringListMap = EtfCsvUtils.initStockPrice();

        // 합치기
        stringListMap.putAll(etfStringListMap);

        for (String symbol : stringListMap.keySet()) {

            //없으면 넘어가기
            Stock stock = stockRepository.findBySymbol(symbol).orElse(null);

            if (stock != null) {
                List<StockPrice> stockPrices = stringListMap.get(symbol);
                for (StockPrice stockPrice : stockPrices) {
                    stockPrice.addStock(stock);
                    stockPriceRepository.save(stockPrice);
                }
            }

        }

    }

}
