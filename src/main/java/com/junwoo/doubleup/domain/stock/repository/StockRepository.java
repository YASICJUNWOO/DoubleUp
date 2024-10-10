package com.junwoo.doubleup.domain.stock.repository;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {

    List<Stock> findAllByOrderByMarketCapDesc(Pageable pageable);

    Optional<Stock> findBySymbol(String symbol);
}
