package com.junwoo.doubleup.outapi.naverapi;

import lombok.Data;

@Data
public class KrStockCsv {
    private String standardCode;          // 표준코드
    private String shortCode;             // 단축코드
    private String stockNameKor;          // 한글 종목명
    private String stockShortNameKor;     // 한글 종목약명
    private String stockNameEng;          // 영문 종목명
    private String listingDate;           // 상장일
    private String marketType;            // 시장구분
    private String securityType;          // 증권구분
    private String affiliation;           // 소속부
    private String stockType;             // 주식종류
    private String faceValue;             // 액면가
    private String numberOfListedStocks;  // 상장주식수
}
