package com.junwoo.doubleup.outapi.lsapi;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class LsStockPriceResponse {

    private String rsp_cd;
    private String rsp_msg;
    private List<Result> t8407OutBlock1;

    @Builder
    @Data
    static class Result {
        private String shcode;
        private int change;
        private int jnilclose;
        private String sign;
        private int uplmtprice;
        private String diff;
        private int offerho;
        private int bidrem;
        private int cvolume;
        private int offerrem;
        private int dnlmtprice;
        private int volume;
        private String chdegree;
        private int bidho;
        private int high;
        private int low;
        private int price;
        private int totofferrem;
        private int value;
        private String hname;
        private int open;
        private int totbidrem;
    }
}
