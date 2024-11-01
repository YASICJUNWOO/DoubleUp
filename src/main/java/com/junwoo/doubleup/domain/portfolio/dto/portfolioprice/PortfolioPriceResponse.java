package com.junwoo.doubleup.domain.portfolio.dto.portfolioprice;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Data
public class PortfolioPriceResponse {

    private LocalDate date;
    private BigDecimal investmentAmount;
    private BigDecimal valueAmount;

}
