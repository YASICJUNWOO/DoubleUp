package com.junwoo.doubleup.domain.ledger.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class LedgerAddRequest {

    private String ledgerYear;
    private String ledgerMonth;
    private List<LedgerDetailRequest> details;

}
