package com.junwoo.doubleup.domain.income.repository;

import com.junwoo.doubleup.domain.income.entity.IncomeDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeDetailRepository extends JpaRepository<IncomeDetail, Long> {
}
