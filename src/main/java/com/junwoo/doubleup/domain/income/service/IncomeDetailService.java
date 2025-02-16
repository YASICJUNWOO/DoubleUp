package com.junwoo.doubleup.domain.income.service;

import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.income.entity.IncomeDetail;
import com.junwoo.doubleup.domain.income.entity.IncomeType;
import com.junwoo.doubleup.domain.income.repository.IncomeDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class IncomeDetailService {
    private final IncomeDetailRepository incomeDetailRepository;
    private final IncomeDetailGetService incomeDetailGetService;

    @Transactional
    public void addIncomeDetail(IncomeDetail incomeDetail) {
        Income income = incomeDetail.getIncome();
        IncomeType type = incomeDetail.getType();

        if (type == IncomeType.INCOME) {
            income.addIncomeDetail(incomeDetail);
        } else {
            income.addExpenseDetail(incomeDetail);
        }

    }

    @Transactional
    public void deleteIncomeDetail(Long id) {
        IncomeDetail incomeDetailById = incomeDetailGetService.getIncomeDetailById(id);
        Income income = incomeDetailById.getIncome();
        income.removeIncomeDetail(incomeDetailById);

        incomeDetailRepository.deleteById(id);
    }

}
