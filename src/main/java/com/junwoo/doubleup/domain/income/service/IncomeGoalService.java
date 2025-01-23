package com.junwoo.doubleup.domain.income.service;

import com.junwoo.doubleup.domain.income.entity.IncomeGoal;
import com.junwoo.doubleup.domain.income.repository.IncomeGoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class IncomeGoalService {

    private final IncomeGoalRepository incomeGoalRepository;
    private final IncomeGoalGetService incomeGoalGetService;

    @Transactional
    public void saveIncomeGoal(IncomeGoal incomeGoal) {
        incomeGoalRepository.save(incomeGoal);
    }

    @Transactional
    public void editIncomeGoal(Long incomeGoalId, IncomeGoal updateIncomeGoal) {
        IncomeGoal originIncomeGoal = incomeGoalGetService.getIncomeGoalById(incomeGoalId);
        originIncomeGoal.updateIncomeGoal(updateIncomeGoal);
    }

}
