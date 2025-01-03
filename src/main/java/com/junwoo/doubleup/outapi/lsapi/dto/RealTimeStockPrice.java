package com.junwoo.doubleup.outapi.lsapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RealTimeStockPrice {
    private String chetime;       // 체결시간
    private String sign;          // 전일대비구분
    private String change;        // 전일대비
    private String drate;         // 등락율
    private String price;         // 현재가
    private String opentime;      // 시가시간
    private String open;          // 시가
    private String hightime;      // 고가시간
    private String high;          // 고가
    private String lowtime;       // 저가시간
    private String low;           // 저가
    private String cgubun;        // 체결구분
    private String cvolume;       // 체결량
    private String volume;        // 누적거래량
    private String value;         // 누적거래대금
    private String mdvolume;      // 매도누적체결량
    private String mdchecnt;      // 매도누적체결건수
    private String msvolume;      // 매수누적체결량
    private String mschecnt;      // 매수누적체결건수
    private String cpower;        // 체결강도

    @JsonProperty("w_avrg")
    private String wAvrg;         // 가중평균가
    private String offerho;       // 매도호가
    private String bidho;         // 매수호가
    private String status;        // 장정보
    private String jnilvolume;    // 전일동시간대거래량
    private String shcode;        // 단축코드
}
