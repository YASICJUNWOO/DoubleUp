package com.junwoo.doubleup.outapi.lsapi;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class LsStockPriceByDateResponse {

    // 응답 코드
    private String rspCd;
    // 응답 메시지
    private String rspMsg;
    // 종목 기본 정보
    private T1305OutBlock t1305OutBlock;
    // 종목 상세 데이터 리스트
    private List<T1305OutBlock1> t1305OutBlock1;

    /**
     * t1305OutBlock - 종목 기본 정보
     */
    @Builder
    @Data
    public static class T1305OutBlock {
        // 조회된 데이터의 날짜 (YYYYMMDD)
        private String date;
        // 데이터 개수
        private int cnt;
        // 데이터 인덱스
        private int idx;
    }

    /**
     * t1305OutBlock1 - 종목 상세 데이터
     */
    @Builder
    @Data
    public static class T1305OutBlock1 {
        // 조회 날짜 (YYYYMMDD)
        private String date;
        // 시가
        private int open;
        // 고가
        private int high;
        // 저가
        private int low;
        // 종가
        private int close;
        // 전일 대비 구분 (1: 상승, 2: 보합, 5: 하락 등)
        private String sign;
        // 전일 대비 가격 변화
        private int change;
        // 등락율 (소수점 포함)
        private String diff;
        // 누적 거래량
        private int volume;
        // 거래 증가율 (소수점 포함)
        private String diff_vol;
        // 체결 강도 (소수점 포함)
        private String chdegree;
        // 소진율 (소수점 포함)
        private String sojinrate;
        // 회전율 (소수점 포함)
        private String changerate;
        // 외인 순매수량
        private int fpvolume;
        // 기관 순매수량
        private int covolume;
        // 종목 코드
        private String shcode;
        // 누적 거래대금 (단위: 백만)
        private int value;
        // 개인 순매수량
        private int ppvolume;
        // 시가 대비 구분
        private String o_sign;
        // 시가 대비 가격 변화
        private int o_change;
        // 시가 기준 등락율 (소수점 포함)
        private String o_diff;
        // 고가 대비 구분
        private String h_sign;
        // 고가 대비 가격 변화
        private int h_change;
        // 고가 기준 등락율 (소수점 포함)
        private String h_diff;
        // 저가 대비 구분
        private String l_sign;
        // 저가 대비 가격 변화
        private int l_change;
        // 저가 기준 등락율 (소수점 포함)
        private String l_diff;
        // 시가총액 (단위: 백만)
        private int marketcap;
    }
}
