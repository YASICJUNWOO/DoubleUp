package com.junwoo.doubleup.outapi.naverapi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true) // 알 수 없는 필드를 무시하기 위해 추가
public class NaverStockResponse {

    private int page;
    private int pageSize;
    private int totalCount;
    private List<Stock> stocks;
    private String marketStatus;
    private String localOpenTimeDesc;
    private String localOpenTime;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true) // 불필요한 필드를 무시하기 위해 추가
    public static class Stock {
        private String stockType;
        private String stockEndType;
        private CompareToPreviousPrice compareToPreviousPrice;
        private String nationType;
        private StockExchangeType stockExchangeType;
        private String reutersCode;
        private String symbolCode;
        private String stockName;
        private String stockNameEng;
        private String reutersIndustryCode;
        private IndustryCodeType industryCodeType;
        private String openPrice;
        private String closePrice;
        private String compareToPreviousClosePrice;
        private String fluctuationsRatio;
        private String executedVolume;
        private String accumulatedTradingVolume;
        private String accumulatedTradingValue;
        private String accumulatedTradingValueKrwHangeul;
        private String localTradedAt;
        private String marketStatus;
        private String marketValue;
        private String marketValueHangeul;
        private String marketValueKrwHangeul;
        private CurrencyType currencyType;
        private String dividend;
        private String dividendPayAt;
        private TradeStopType tradeStopType;
        private String endUrl;
        private String delayTimeName;
        private String stockEndUrl;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class CompareToPreviousPrice {
            private String code;
            private String text;
            private String name;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class StockExchangeType {
            private String code;
            private String zoneId;
            private String nationType;
            private int delayTime;
            private String startTime;
            private String endTime;
            private String closePriceSendTime;
            private String nameKor;
            private String nameEng;
            private String stockType;
            private String nationName;
            private String nationCode;
            private String name;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class IndustryCodeType {
            private String code;
            private String industryGroupKor;
            private String name;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class CurrencyType {
            private String code;
            private String text;
            private String name;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class TradeStopType {
            private String code;
            private String text;
            private String name;
        }
    }
}
