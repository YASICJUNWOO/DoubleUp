package com.junwoo.doubleup.domain.income.repository;

import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findAllByMemberAndYearValue(Member member, int year);
}
