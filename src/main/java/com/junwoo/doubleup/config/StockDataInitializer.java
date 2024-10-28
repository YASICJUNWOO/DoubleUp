package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.stock.entity.StockType;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import com.junwoo.doubleup.outapi.lsapi.LsApiService;
import com.junwoo.doubleup.outapi.naverapi.CsvUtils;
import com.junwoo.doubleup.outapi.naverapi.EtfCsvUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class StockDataInitializer implements DataInitializer {

    private final StockRepository stockRepository;
    private final LsApiService lsApiService;

    @Override
    @Transactional
    public void init() {

        if (!stockRepository.existsStockByStockType(StockType.COMMON)) {
            stockRepository.saveAll(CsvUtils.getStocksFromCsv());
        }

        CsvUtils.initStockPrice();

        if (!stockRepository.existsStockByStockType(StockType.ETF)) {
            stockRepository.saveAll(EtfCsvUtils.getEtfFromCsv());
        }

        EtfCsvUtils.initStockPrice();

    }
}
