package com.junwoo.doubleup.domain.stock.repository;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {

    //유형별 주식 조회
    boolean existsStockByStockType(StockType stockType);

    List<Stock> findAllByStockTypeOrderByMarketCapDesc(StockType stockType, Pageable pageable);

    Optional<Stock> findBySymbol(String symbol);
}
