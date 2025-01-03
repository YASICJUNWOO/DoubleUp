package com.junwoo.doubleup.domain.ledger.service;

import com.junwoo.doubleup.domain.ledger.Ledger;
import com.junwoo.doubleup.domain.ledger.LedgerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LedgerService {

    private final LedgerRepository ledgerRepository;
    private final LedgerGetService ledgerGetService;

    @Transactional
    public Ledger addLedger(Ledger ledger) {

        if (ledgerGetService.getLedgerByYM(ledger.getLedgerYear(), ledger.getLedgerMonth()) != null) {
            throw new IllegalArgumentException("Ledger with year " + ledger.getLedgerYear() + " and month " + ledger.getLedgerMonth() + " already exists");
        }

        initializeLedgerDetails(ledger, ledger);
        return ledgerRepository.save(ledger);
    }

    @Transactional
    public Ledger updateLedger(Long LedgerId, Ledger updatedLedger) {
        Ledger existingLedger = ledgerGetService.getLedgerById(LedgerId);

        initializeLedgerDetails(updatedLedger, existingLedger);

        // 기존 Ledger의 details 초기화 및 새로운 details 추가
        existingLedger.getDetails().clear();
        existingLedger.getDetails().addAll(updatedLedger.getDetails());

        return ledgerRepository.save(existingLedger);
    }

    private void initializeLedgerDetails(Ledger updatedLedger, Ledger ledger) {
        updatedLedger.getDetails().forEach(detail -> {
            detail.setLedger(ledger);
        });
    }

}
