package com.junwoo.doubleup.outapi.tossapi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

public class TossNewsDto {

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class NewsResponse {
        private Result result;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Result {
        private PagingParam pagingParam;
        private List<NewsItem> body;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PagingParam {
        private int number;
        private int size;
        private String key;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class NewsItem {
        private String id;
        private String title;
        private String summary;
        private String contentText;
        private List<String> imageUrls;
        private Source source;
        private List<Object> relatedNews;
        private Object stockCodes;
        private Object stockInfo;
        private String createdAt;
        private String updatedAt;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Source {
        private String code;
        private String name;
        private String faviconUrl;
        private String logoImageUrl;
        private String logoImageUrlDark;
    }
}
