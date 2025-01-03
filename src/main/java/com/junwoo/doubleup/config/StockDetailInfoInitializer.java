package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.stock.entity.StockDetailInfo;
import com.junwoo.doubleup.domain.stock.repository.StockDetailInfoRepository;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import com.junwoo.doubleup.outapi.csv.StockDetailInfoCsv;
import com.junwoo.doubleup.outapi.csv.dto.StockDetailInfoDto;
import com.junwoo.doubleup.outapi.lsapi.LsApiService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class StockDetailInfoInitializer implements DataInitializer{

    private final StockRepository stockRepository;
    private final StockDetailInfoRepository stockDetailInfoRepository;

    private final LsApiService lsApiService;

    @Override
    @Transactional
    public void init() {

        if (stockDetailInfoRepository.count() > 0) {
            log.info("StockDetailInfo 데이터가 이미 존재합니다. 초기화를 건너뜁니다.");
            return;
        }

        log.info("StockDetailInfo 데이터 초기화 시작");

        List<StockDetailInfoDto> stockDetailInfoFromCsv =
                StockDetailInfoCsv.getStockDetailInfoFromCsv();

        for (StockDetailInfoDto stockDetailInfoDto : stockDetailInfoFromCsv) {

            stockRepository.findBySymbol(stockDetailInfoDto.getStockSymbol())
                    .ifPresent(stock -> {
                        StockDetailInfo stockDetailInfo = StockDetailInfo.builder()
                                .stock(stock)
                                .sectorCategory(stockDetailInfoDto.getSectorCategory())
                                .sectorCode(stockDetailInfoDto.getSectorCode())
                                .sectorName(stockDetailInfoDto.getSectorName())
                                .ceo(stockDetailInfoDto.getCeo())
                                .address(stockDetailInfoDto.getAddress())
                                .build();

                        stockDetailInfoRepository.save(stockDetailInfo);
                    });
        }
    }

}
