package com.junwoo.doubleup.domain.ledger;

import com.junwoo.doubleup.domain.ledger.dto.LedgerAddRequest;
import com.junwoo.doubleup.domain.ledger.dto.LedgerMapper;
import com.junwoo.doubleup.domain.ledger.service.LedgerGetService;
import com.junwoo.doubleup.domain.ledger.service.LedgerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ledgers")
@RequiredArgsConstructor
public class LedgerController {

    private final LedgerMapper ledgerMapper = LedgerMapper.INSTANCE;
    private final LedgerService ledgerService;
    private final LedgerGetService ledgerGetService;

    @GetMapping
    public Ledger findAll(@RequestParam(name = "year") String year, @RequestParam(name = "month") String month) {
        return ledgerGetService.getLedgerByYM(year, month);
    }


    @PostMapping
    public Ledger saveLedger(@RequestBody LedgerAddRequest ledgerAddRequest) {
        Ledger ledger = ledgerMapper.toLedger(ledgerAddRequest);
        return ledgerService.addLedger(ledger);
    }

    @PatchMapping
    public Ledger updateLedger(@RequestParam(name = "ledgerId") Long ledgerId, @RequestBody LedgerAddRequest ledgerAddRequest) {
        Ledger ledger = ledgerMapper.toLedger(ledgerAddRequest);
        return ledgerService.updateLedger(ledgerId, ledger);
    }

}
