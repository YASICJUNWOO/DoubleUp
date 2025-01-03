package com.junwoo.doubleup.domain.stock.controller;

import com.junwoo.doubleup.domain.stock.entity.SectorCategory;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockDetailInfo;
import com.junwoo.doubleup.domain.stock.repository.StockDetailInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stock/info")
@RequiredArgsConstructor
public class StockInfoController {

    private final StockDetailInfoRepository stockDetailInfoRepository;

    @GetMapping
    public StockDetailInfo getStockInfo(@RequestParam(name = "stockId") Long stockId) {
        return stockDetailInfoRepository.findByStock_StockId(stockId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주식 정보가 존재하지 않습니다."));
    }

    @GetMapping("/similar")
    public List<Stock> getSimilarStocks(@RequestParam(name = "stockId") Long stockId, @RequestParam(name = "type") String type) {
        StockDetailInfo stockDetailInfo = stockDetailInfoRepository.findByStock_StockId(stockId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주식 정보가 존재하지 않습니다."));

        Pageable top5 = PageRequest.of(0, 5); // 첫 번째 페이지의 5개 항목

        if(type.equals("sectorCode")){
            String sectorCode = stockDetailInfo.getSectorCode();
            return stockDetailInfoRepository.findTopBySectorCodeOrderByMarketCapDesc(sectorCode, top5);
        } else if (type.equals("sectorCategory")){
            SectorCategory sectorCategory = stockDetailInfo.getSectorCategory();
            return stockDetailInfoRepository.findTopBySectorCategoryOrderByMarketCapDesc(sectorCategory, top5);
        } else {
            throw new IllegalArgumentException("올바른 타입을 입력해주세요.");
        }
    }

}
