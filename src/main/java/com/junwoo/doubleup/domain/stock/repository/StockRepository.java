package com.junwoo.doubleup.domain.stock.repository;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}
