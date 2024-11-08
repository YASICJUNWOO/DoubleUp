package com.junwoo.doubleup.domain.stock.repository;

import com.junwoo.doubleup.domain.stock.entity.StockDetailInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockDetailInfoRepository extends JpaRepository<StockDetailInfo, Long> {
    Optional<StockDetailInfo> findByStock_StockId(Long stockId);
}
