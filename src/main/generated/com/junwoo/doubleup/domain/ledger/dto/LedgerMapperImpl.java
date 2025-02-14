package com.junwoo.doubleup.domain.ledger.dto;

import com.junwoo.doubleup.domain.ledger.Ledger;
import com.junwoo.doubleup.domain.ledger.LedgerDetail;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class LedgerMapperImpl implements LedgerMapper {

    @Override
    public Ledger toLedger(LedgerAddRequest ledgerAddRequest) {
        if ( ledgerAddRequest == null ) {
            return null;
        }

        Ledger.LedgerBuilder ledger = Ledger.builder();

        ledger.ledgerYear( ledgerAddRequest.getLedgerYear() );
        ledger.ledgerMonth( ledgerAddRequest.getLedgerMonth() );
        ledger.details( ledgerDetailRequestListToLedgerDetailList( ledgerAddRequest.getDetails() ) );

        return ledger.build();
    }

    @Override
    public LedgerDetail toLedgerDetail(LedgerDetailRequest ledgerDetailRequest) {
        if ( ledgerDetailRequest == null ) {
            return null;
        }

        LedgerDetail.LedgerDetailBuilder ledgerDetail = LedgerDetail.builder();

        ledgerDetail.date( ledgerDetailRequest.getDate() );
        ledgerDetail.type( ledgerDetailRequest.getType() );
        ledgerDetail.category( ledgerDetailRequest.getCategory() );
        ledgerDetail.payment( ledgerDetailRequest.getPayment() );
        ledgerDetail.name( ledgerDetailRequest.getName() );
        ledgerDetail.amount( ledgerDetailRequest.getAmount() );

        return ledgerDetail.build();
    }

    protected List<LedgerDetail> ledgerDetailRequestListToLedgerDetailList(List<LedgerDetailRequest> list) {
        if ( list == null ) {
            return null;
        }

        List<LedgerDetail> list1 = new ArrayList<LedgerDetail>( list.size() );
        for ( LedgerDetailRequest ledgerDetailRequest : list ) {
            list1.add( toLedgerDetail( ledgerDetailRequest ) );
        }

        return list1;
    }
}
