package com.junwoo.doubleup.domain.income.service;

import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.income.repository.IncomeRepository;
import com.junwoo.doubleup.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeGetService {

    private final IncomeRepository incomeRepository;

    @Transactional(readOnly = true)
    public List<Income> getIncomeByYear(Member member, int year) {
        return incomeRepository.findAllByMemberAndYearValue(member, year);
    }

    @Transactional(readOnly = true)
    public Income getIncomeById(Long incomeId) {
        return incomeRepository.findById(incomeId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 수입이 없습니다."));
    }

}
