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
public class RealTimeExchangeRate {

    private String offer;   // 매도호가
    private String high;    // 고가
    private String drate;   // 등락율
    private String low;     // 저가

    @JsonProperty("base_id")
    private String baseId;  // 기초자산ID
    private String price;   // 체결가
    private String change;  // 전일대비
    private String sign;    // 전일대비구분
    private String ctime;   // 데이타발생시간
    private String time;    // 전송시간
    private String bid;     // 매수호가
    private String open;    // 시가
}
