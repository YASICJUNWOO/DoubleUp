package com.junwoo.doubleup.domain.income.service;

import com.junwoo.doubleup.domain.income.entity.IncomeGoal;
import com.junwoo.doubleup.domain.income.entity.IncomeGoalRangeType;
import com.junwoo.doubleup.domain.income.repository.IncomeGoalRepository;
import com.junwoo.doubleup.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class IncomeGoalGetService {

    private final IncomeGoalRepository incomeGoalRepository;

    @Transactional(readOnly = true)
    public IncomeGoal getIncomeGoalOrNull(Member member, IncomeGoalRangeType type, int year, Integer month) {
        return incomeGoalRepository.findByMemberAndRangeTypeAndYearValueAndMonthValue(member, type, year, month)
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public IncomeGoal getIncomeGoalById(Long id) {
        return incomeGoalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 목표가 없습니다."));
    }
}
