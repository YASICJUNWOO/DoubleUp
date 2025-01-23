package com.junwoo.doubleup.domain.income.controller;

import com.junwoo.doubleup.domain.income.dto.IncomeGoalMapper;
import com.junwoo.doubleup.domain.income.entity.IncomeGoal;
import com.junwoo.doubleup.domain.income.entity.IncomeGoalRangeType;
import com.junwoo.doubleup.domain.income.service.IncomeGoalGetService;
import com.junwoo.doubleup.domain.income.service.IncomeGoalService;
import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/income-goal")
@RequiredArgsConstructor
@Tag(name = "수입 목표", description = "수입 목표 관련 API")
public class IncomeGoalController {

    private final IncomeGoalGetService incomeGoalGetService;

    private final IncomeGoalMapper incomeGoalMapper = IncomeGoalMapper.INSTANCE;
    private final MemberGetService memberGetService;
    private final IncomeGoalService incomeGoalService;

    @PostMapping
    public void createIncomeGoal(
            //            @AuthenticationPrincipal String username,
            @RequestBody IncomeGoal incomeGoal) {
        Member findedMember = memberGetService.findById(1L);
        IncomeGoal entity = incomeGoalMapper.toEntity(findedMember, incomeGoal);
        incomeGoalService.saveIncomeGoal(entity);
    }

    @PatchMapping("/{id}")
    public void updateIncomeGoal(@PathVariable(name = "id") Long id, @RequestBody IncomeGoal incomeGoal) {
        incomeGoalService.editIncomeGoal(id, incomeGoal);
    }

    @GetMapping
    public IncomeGoal getIncomeGoal(
//            @AuthenticationPrincipal String username,
            @RequestParam(name = "type") IncomeGoalRangeType type,
            @RequestParam(name = "year") int year,
            @RequestParam(name = "month", required = false) Integer month) {
        Member findedMember = memberGetService.findById(1L);
        return incomeGoalGetService.getIncomeGoalOrNull(findedMember, type, year, month);
    }
}
