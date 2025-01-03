package com.junwoo.doubleup.domain.ledger;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LedgerRepository extends JpaRepository<Ledger, Long> {
    Optional<Ledger> findByLedgerYearAndLedgerMonth(String ledgerYear, String ledgerMonth);
}
