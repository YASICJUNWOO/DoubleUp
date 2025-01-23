package com.junwoo.doubleup.domain.income.repository;

import com.junwoo.doubleup.domain.income.entity.IncomeGoal;
import com.junwoo.doubleup.domain.income.entity.IncomeGoalRangeType;
import com.junwoo.doubleup.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IncomeGoalRepository extends JpaRepository<IncomeGoal, Long> {
    Optional<IncomeGoal> findByMemberAndRangeTypeAndYearValueAndMonthValue(Member member, IncomeGoalRangeType rangeType, int year, Integer month);
}
