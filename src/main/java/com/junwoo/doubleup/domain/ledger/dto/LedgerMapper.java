package com.junwoo.doubleup.domain.ledger.dto;

import com.junwoo.doubleup.domain.ledger.Ledger;
import com.junwoo.doubleup.domain.ledger.LedgerDetail;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface LedgerMapper {

    LedgerMapper INSTANCE = Mappers.getMapper(LedgerMapper.class);

    Ledger toLedger(LedgerAddRequest ledgerAddRequest);

    LedgerDetail toLedgerDetail(LedgerDetailRequest ledgerDetailRequest);
}
