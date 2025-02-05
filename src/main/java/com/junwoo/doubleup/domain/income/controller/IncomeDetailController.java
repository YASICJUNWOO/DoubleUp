package com.junwoo.doubleup.domain.income.controller;

import com.junwoo.doubleup.domain.income.dto.IncomeDetailMapper;
import com.junwoo.doubleup.domain.income.dto.IncomeDetailRequest;
import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.income.entity.IncomeDetail;
import com.junwoo.doubleup.domain.income.service.IncomeDetailService;
import com.junwoo.doubleup.domain.income.service.IncomeGetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/income-detail")
@RequiredArgsConstructor
@Tag(name = "수입 상세", description = "수입 상세 API")
public class IncomeDetailController {

    private final IncomeDetailService incomeDetailService;

    private final IncomeGetService incomeGetService;

    private final IncomeDetailMapper incomeDetailMapper = IncomeDetailMapper.INSTANCE;

    @Operation(summary = "수입 상세 추가")
    @PostMapping
    public void addIncomeDetail(@RequestBody IncomeDetailRequest incomeDetailRequest) {
        Income findedIncome = incomeGetService.getIncomeById(incomeDetailRequest.getIncomeId());
        IncomeDetail incomeDetail = incomeDetailMapper.toIncomeDetail(findedIncome, incomeDetailRequest);
        incomeDetailService.addIncomeDetail(incomeDetail);
    }

    @Operation(summary = "수입 상세 삭제")
    @DeleteMapping("/{id}")
    public void deleteIncomeDetail(@PathVariable Long id) {
        incomeDetailService.deleteIncomeDetail(id);
    }

}
