package com.junwoo.doubleup.domain.portfolio.repository;

import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioStockRepository extends JpaRepository<PortfolioStock, Long> {
}
