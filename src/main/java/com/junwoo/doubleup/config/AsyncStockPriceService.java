package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import com.junwoo.doubleup.outapi.csv.CsvUtils;
import com.junwoo.doubleup.outapi.lsapi.LsApiService;
import com.junwoo.doubleup.outapi.lsapi.LsStockPriceByDateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class AsyncStockPriceService {

    private final StockRepository stockRepository;
    private final LsApiService lsApiService;

    @Async
    public void savePastPriceData() throws IOException, InterruptedException {
        // yyyyMMdd 형식 지정
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        String pastDate = CsvUtils.getPastDate();

        log.info("과거 주가 데이터 저장 시작 : {}", pastDate);

        if (LocalDate.parse(pastDate, formatter).isBefore(LocalDate.parse("20000101", formatter))) {
            return;
        }

        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        List<Stock> allStockList = stockRepository.findAll();
        int totalSize = allStockList.size();
        int count = 0;

        Map<String, List<List<String>>> writeDataByMap = new HashMap<>();

        for (Stock stock : allStockList) {

            log.info("종목 처리 시작 - Symbol: {}, Name: {}", stock.getSymbol(), stock.getName());

            LsStockPriceByDateResponse stockPriceDataByDate =
                    lsApiService.getStockPriceDataByDate(LocalDate.parse(pastDate, formatter), stock.getSymbol());


            List<LsStockPriceByDateResponse.T1305OutBlock1> priceResult = stockPriceDataByDate.getT1305OutBlock1();

            log.info("API 응답 데이터 - Symbol: {}, 데이터 개수: {}", stock.getSymbol(), priceResult.size());

            priceResult.forEach(result -> {
                String date = result.getDate();

                List<String> writeData = List.of(
                        stock.getSymbol(),                          // 종목코드
                        stock.getName(),                            // 종목명
                        "",                                         // 시장구분 (해당 값 없음)
                        "",                                         // 소속부 (해당 값 없음)
                        String.valueOf(result.getClose()),          // 종가
                        String.valueOf(result.getChange()),         // 대비
                        result.getDiff(),                           // 등락률
//                        "",                                         // 순자산가치(NAV) (해당 값 없음)
                        String.valueOf(result.getOpen()),           // 시가
                        String.valueOf(result.getHigh()),           // 고가
                        String.valueOf(result.getLow()),            // 저가
                        String.valueOf(result.getVolume()),         // 거래량
                        String.valueOf(result.getValue()),          // 거래대금 (누적 거래대금)
                        String.valueOf(result.getMarketcap()),      // 시가총액
                        "",                                         // 순자산총액 (해당 값 없음)
                        "",                                         // 상장좌수 (해당 값 없음)
                        "",                                         // 기초지수_지수명 (해당 값 없음)
                        "",                                         // 기초지수_종가 (해당 값 없음)
                        "",                                         // 기초지수_대비 (해당 값 없음)
                        ""                                          // 기초지수_등락률 (해당 값 없음)
                );

                List<String> list = writeData.stream().map(s -> {
                    if (!s.isEmpty()) {
                        return '"' + s + '"';
                    }
                    return s;
                }).toList();

                List<String> stringData = List.of(String.join(",", list));

                if (writeDataByMap.containsKey(date)) {
                    log.info("{} 있음", date);
                    List<List<String>> lists = writeDataByMap.get(date);
                    lists.add(stringData);
                } else {
                    log.info("{} 추가", date);
                    writeDataByMap.put(date, new ArrayList<>(List.of(stringData)));
                }

            });

            log.info("진행률 - {}/{}", ++count, totalSize);

            Thread.sleep(1000);
        }

        for (Map.Entry<String, List<List<String>>> entry : writeDataByMap.entrySet()) {
            String date = entry.getKey();
            List<List<String>> lists = entry.getValue();

            log.info("CSV 파일 저장 - {}", lists);

            if (!CsvUtils.existFile(date)) {
                CsvUtils.writeCsvFile(date,
                        List.of("종목코드,종목명,시장구분,소속부,종가,대비,등락률,시가,고가,저가,거래량,거래대금,시가총액,순자산총액,상장좌수,기초지수_지수명,기초지수_종가,기초지수_대비,기초지수_등락률"));
            }

            lists.forEach(data -> CsvUtils.writeCsvFile(date, data));
        }
    }

}