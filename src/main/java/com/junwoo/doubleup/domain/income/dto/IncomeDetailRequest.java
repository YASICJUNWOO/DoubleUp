package com.junwoo.doubleup.domain.income.dto;

import com.junwoo.doubleup.domain.income.entity.IncomeCategory;
import com.junwoo.doubleup.domain.income.entity.IncomeType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class IncomeDetailRequest {

    private IncomeType type;
    private IncomeCategory category;
    private String content;
    private BigDecimal amount;
    private LocalDateTime date;
    private Long incomeId;

}
