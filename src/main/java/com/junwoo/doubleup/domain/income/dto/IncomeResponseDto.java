package com.junwoo.doubleup.domain.income.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class IncomeResponseDto {

    private Long id;
    private int year;
    private int month;
    private BigDecimal income;
    private BigDecimal expense;
    private BigDecimal totalIncome;
}
