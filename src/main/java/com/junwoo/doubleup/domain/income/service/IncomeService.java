package com.junwoo.doubleup.domain.income.service;

import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.income.repository.IncomeRepository;
import com.junwoo.doubleup.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final IncomeGetService incomeGetService;

    @Transactional
    public void createWholeIncome(Member member, List<Income> incomeList) {

        // 연도와 회원으로 기존 데이터 조회
        List<Income> existingIncomes = incomeGetService.getIncomeByYear(member, incomeList.get(0).getYearValue());
        Map<Integer, Income> existingIncomeMap = existingIncomes.stream()
                .collect(Collectors.toMap(Income::getMonthValue, income -> income));

        // 데이터 순회하며 업데이트 또는 저장
        incomeList.forEach(newIncome -> {
            Income existingIncome = existingIncomeMap.get(newIncome.getMonthValue());
            if (existingIncome != null) {
                // 기존 데이터 업데이트
                existingIncome.updateIncome(newIncome);
                incomeRepository.save(existingIncome);
            } else {
                // 새로운 데이터 저장
                incomeRepository.save(newIncome);
            }
        });

    }

}
