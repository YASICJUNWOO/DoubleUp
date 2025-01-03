package com.junwoo.doubleup.domain.ledger.service;

import com.junwoo.doubleup.domain.ledger.Ledger;
import com.junwoo.doubleup.domain.ledger.LedgerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LedgerGetService {

    private final LedgerRepository ledgerRepository;

    public Ledger getLedgerById(Long ledgerId) {
        return ledgerRepository.findById(ledgerId).orElseThrow(() ->
                new IllegalArgumentException("Ledger with id " + ledgerId + " not found"));
    }

    @Transactional(readOnly = true)
    public Ledger getLedgerByYM(String year, String month) {
        return ledgerRepository.findByLedgerYearAndLedgerMonth(year, month)
                .orElseThrow(() -> new IllegalArgumentException("Ledger with year " + year + " and month " + month + " not found"));
    }

}

