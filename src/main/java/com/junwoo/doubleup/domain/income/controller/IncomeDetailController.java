package com.junwoo.doubleup.domain.income.controller;

import com.junwoo.doubleup.domain.income.dto.IncomeDetailMapper;
import com.junwoo.doubleup.domain.income.dto.IncomeDetailRequest;
import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.income.entity.IncomeDetail;
import com.junwoo.doubleup.domain.income.service.IncomeDetailService;
import com.junwoo.doubleup.domain.income.service.IncomeGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/income-detail")
@RequiredArgsConstructor
public class IncomeDetailController {

    private final IncomeDetailService incomeDetailService;

    private final IncomeGetService incomeGetService;

    private final IncomeDetailMapper incomeDetailMapper = IncomeDetailMapper.INSTANCE;

    @PostMapping
    public void addIncomeDetail(@RequestBody IncomeDetailRequest incomeDetailRequest) {
        Income findedIncome = incomeGetService.getIncomeById(incomeDetailRequest.getIncomeId());
        IncomeDetail incomeDetail = incomeDetailMapper.toIncomeDetail(findedIncome, incomeDetailRequest);
        incomeDetailService.addIncomeDetail(incomeDetail);
    }
}
