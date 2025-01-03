package com.junwoo.doubleup.domain.stock.repository;

import com.junwoo.doubleup.domain.stock.entity.SectorCategory;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockDetailInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StockDetailInfoRepository extends JpaRepository<StockDetailInfo, Long> {
    Optional<StockDetailInfo> findByStock_StockId(Long stockId);

    // 특정 섹터 코드에서 시가총액 기준 상위 5개 주식 조회
    @Query("SELECT s.stock FROM StockDetailInfo s WHERE s.sectorCode = :sectorCode ORDER BY s.stock.marketCap DESC")
    List<Stock> findTopBySectorCodeOrderByMarketCapDesc(@Param("sectorCode") String sectorCode, Pageable pageable);

    // 특정 섹터 카테고리에서 시가총액 기준 상위 5개 주식 조회
    @Query("SELECT s.stock FROM StockDetailInfo s WHERE s.sectorCategory = :sectorCategory ORDER BY s.stock.marketCap DESC")
    List<Stock> findTopBySectorCategoryOrderByMarketCapDesc(@Param("sectorCategory") SectorCategory sectorCategory, Pageable pageable);
}
