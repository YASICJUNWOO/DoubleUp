package com.junwoo.doubleup.domain.portfolio.repository;

import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
}
