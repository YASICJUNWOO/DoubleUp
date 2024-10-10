package com.junwoo.doubleup.outapi.lsapi;

import lombok.Data;

import java.util.List;

@Data
public class KrStockDto {

    private String rsp_cd;      // 응답 코드
    private String rsp_msg;     // 응답 메시지
    private List<Stock> t8436OutBlock;  // 종목 정보 리스트

    @Data
    public static class Stock {
        private String hname;         // 종목명
        private String shcode;        // 단축코드
        private String expcode;       // 확장코드
        private String etfgubun;      // ETF 구분 (1: ETF, 2: ETN)
        private int uplmtprice;       // 상한가
        private int dnlmtprice;       // 하한가
        private int jnilclose;        // 전일가
        private String memedan;       // 주문수량단위
        private int recprice;         // 기준가
        private String gubun;         // 구분 (1: 코스피, 2: 코스닥)
        private String bu12gubun;     // 증권그룹
        private String spac_gubun;    // 기업인수목적회사 여부 (Y/N)
        private String filler;        // 미사용 필드
    }

}
