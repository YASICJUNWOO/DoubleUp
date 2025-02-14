package com.junwoo.doubleup.domain.income.controller;

import com.junwoo.doubleup.domain.income.dto.IncomeMapper;
import com.junwoo.doubleup.domain.income.dto.IncomeRequestDto;
import com.junwoo.doubleup.domain.income.dto.IncomeResponseDto;
import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.income.service.IncomeGetService;
import com.junwoo.doubleup.domain.income.service.IncomeService;
import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
@RequiredArgsConstructor
public class IncomeController {

    private final IncomeService incomeService;
    private final IncomeGetService incomeGetService;

    private final IncomeMapper incomeMapper = IncomeMapper.INSTANCE;
    private final MemberGetService memberGetService;

    @GetMapping
    public List<IncomeResponseDto> getIncomeByYear(
//            @AuthenticationPrincipal String username,
            @RequestParam(name = "year") int year) {

        Member findedMember = memberGetService.findById(1L);
        return incomeGetService.getIncomeByYear(findedMember, year).stream()
                .map(incomeMapper::toResponse).toList();
    }

    @GetMapping("/{incomeId}")
    public Income getIncomeById(@PathVariable Long incomeId) {
        return incomeGetService.getIncomeById(incomeId);
    }

    @PostMapping
    public void createIncome(
//            @AuthenticationPrincipal String username,
            @RequestBody List<IncomeRequestDto> incomeRequestDtoList
    ) {

        Member findedMember = memberGetService.findById(1L);
        List<Income> incomeList = incomeRequestDtoList.stream()
                .map(dto -> incomeMapper.toEntity(findedMember, dto)).toList();

        incomeService.createWholeIncome(findedMember, incomeList);
    }

    @DeleteMapping
    public void deleteIncomeByYear(
//            @AuthenticationPrincipal String username,
            @RequestParam(name = "year") int year) {
        Member findedMember = memberGetService.findById(1L);
        incomeService.deleteIncome(findedMember, year);
    }


}
