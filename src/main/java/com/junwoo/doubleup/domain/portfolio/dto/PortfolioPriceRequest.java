package com.junwoo.doubleup.domain.portfolio.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class PortfolioPriceRequest {

    private Long portfolioId;
    private LocalDate startDate;
    private LocalDate endDate;

}
