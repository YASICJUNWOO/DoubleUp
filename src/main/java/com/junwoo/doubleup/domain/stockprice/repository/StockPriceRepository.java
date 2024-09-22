package com.junwoo.doubleup.domain.stockprice.repository;

import com.junwoo.doubleup.domain.stockprice.entity.StockPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StockPriceRepository extends JpaRepository<StockPrice, Long> {
	Optional<StockPrice> findByStockIdAndDate(Long id, LocalDate date);

	List<StockPrice> findByStockIdOrderByDateAsc(Long stockId);
}