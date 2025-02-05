package com.junwoo.doubleup.domain.income.service;

import com.junwoo.doubleup.domain.income.entity.IncomeDetail;
import com.junwoo.doubleup.domain.income.repository.IncomeDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class IncomeDetailGetService {

    private final IncomeDetailRepository incomeDetailRepository;

    @Transactional(readOnly = true)
    public IncomeDetail getIncomeDetailById(Long id) {
        return incomeDetailRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 수입 상세가 없습니다."));
    }
}
