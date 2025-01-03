package com.junwoo.doubleup.domain.ledger.service;

import com.junwoo.doubleup.domain.ledger.LedgerDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LedgerDetailService {

    private final LedgerDetailRepository ledgerDetailRepository;

    public Boolean existsByLedgerId(Long ledgerId) {
        return ledgerDetailRepository.existsByLedgerDetailId(ledgerId);
    }

}
