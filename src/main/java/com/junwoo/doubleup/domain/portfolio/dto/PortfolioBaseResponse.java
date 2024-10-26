package com.junwoo.doubleup.domain.portfolio.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Builder
@Data
public class PortfolioBaseResponse {

    private Long id;
    private String name;
    private BigDecimal totalInvestmentAmount;
    private BigDecimal totalCurrentValue;

}
