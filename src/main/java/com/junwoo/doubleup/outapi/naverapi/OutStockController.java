package com.junwoo.doubleup.outapi.naverapi;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/outstock")
public class OutStockController {

    private final String filePath = "stocks.csv";

    private final NaverApiService naverApiService;

    @GetMapping
    public List<NaverStockResponse.Stock> outStock() {
        File file = new File(filePath);

        if (file.exists()) {
            // 파일이 있으면 읽어오기
            return CsvUtils.readStocksFromCSV(filePath);
        } else {
            // 파일이 없으면 생성 후 저장
            List<NaverStockResponse.Stock> stocksToSave = naverApiService.outStock();
            CsvUtils.writeStocksToCSV(stocksToSave, filePath);
            return stocksToSave;
        }

    }

}
