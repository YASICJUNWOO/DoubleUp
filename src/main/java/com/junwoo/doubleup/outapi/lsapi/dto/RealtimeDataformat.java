package com.junwoo.doubleup.outapi.lsapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // null 필드 제외 (필요할 경우)
public class RealtimeDataformat {

    //        //{
    //        //    "header": {
    //        //        "tr_cd": "S3_",
    //        //        "tr_key": "005930"
    //        //    },
    //        //    "body": {
    //        //        "mdchecnt": "55521",
    //        //        "sign": "5",
    //        //        "mschecnt": "62000",
    //        //        "mdvolume": "13475848",
    //        //        "w_avrg": "56742",
    //        //        "cpower": "84.35",
    //        //        "offerho": "56100",
    //        //        "cvolume": "1",
    //        //        "high": "57500",
    //        //        "bidho": "56000",
    //        //        "low": "55900",
    //        //        "price": "56100",
    //        //        "cgubun": "+",
    //        //        "value": "1475405",
    //        //        "change": "600",
    //        //        "shcode": "005930",
    //        //        "chetime": "141323",
    //        //        "opentime": "090022",
    //        //        "lowtime": "140137",
    //        //        "volume": "26002320",
    //        //        "drate": "-1.06",
    //        //        "hightime": "092155",
    //        //        "jnilvolume": "41335137",
    //        //        "msvolume": "11367478",
    //        //        "open": "56500",
    //        //        "status": "00"
    //        //    }
    //        //}

    private Header header;
    private Object body;

    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Header {

        @JsonProperty("tr_cd")
        private String trCd;

        @JsonProperty("tr_key")
        private String trKey;

        // ====== 등록 완료시 =======

        @JsonProperty("tr_type")
        private String trType;

        @JsonProperty("rsp_cd")
        private String rspCd;

        @JsonProperty("rsp_msg")
        private String rspMsg;
    }

}
