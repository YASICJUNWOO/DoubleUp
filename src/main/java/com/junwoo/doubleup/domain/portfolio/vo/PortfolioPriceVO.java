package com.junwoo.doubleup.domain.portfolio.vo;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Builder
@Data
public class PortfolioPriceVO {
    private BigDecimal investmentAmount;
    private BigDecimal valueAmount;
}
