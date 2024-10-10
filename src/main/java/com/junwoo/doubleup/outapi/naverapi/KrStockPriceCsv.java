package com.junwoo.doubleup.outapi.naverapi;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class KrStockPriceCsv {

    //종목코드,종목명,시장구분,소속부,종가,대비,등락률,시가,고가,저가,거래량,거래대금,시가총액,상장주식수
    private LocalDate date;

    private String shortCode;
    //종가
    private String closePrice;
    //대비
    private String diff;
    //등락률
    private String fluctuationRate;
    //시가
    private String openPrice;
    //고가
    private String highPrice;
    //저가
    private String lowPrice;
    //거래량
    private String volume;
    //거래대금
    private String tradingValue;
    //시가총액
    private String marketCap;
}
