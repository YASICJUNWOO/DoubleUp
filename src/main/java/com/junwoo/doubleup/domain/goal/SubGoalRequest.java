package com.junwoo.doubleup.domain.goal;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Builder
@Data
public class SubGoalRequest {

    private Long memberId; // 사용자 ID
    private String goalName; // 목표 이름
    private GoalType goalType; // 목표 유형
    private List<LocalDate> goalPeriod; // 목표 기간
    private BigDecimal goalAmount; // 목표 금액
    private InstallmentFrequencyType installmentFrequency; // 할부 빈도
    private BigDecimal installmentAmount; // 할부 금액

}
