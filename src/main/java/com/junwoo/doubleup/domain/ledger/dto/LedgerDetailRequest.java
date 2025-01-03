package com.junwoo.doubleup.domain.ledger.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LedgerDetailRequest {

    private String date;
    private String type; // INCOME, EXPENSE
    private String category;
    private String payment;
    private String name;
    private Double amount;

}
