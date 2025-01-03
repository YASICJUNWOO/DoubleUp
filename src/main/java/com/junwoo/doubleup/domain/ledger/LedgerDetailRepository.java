package com.junwoo.doubleup.domain.ledger;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LedgerDetailRepository extends JpaRepository<LedgerDetail, Long> {

    Boolean existsByLedgerDetailId(Long ledgerId);
}
