package com.junwoo.doubleup.outapi.tossapi;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class TossNewsDetailDto {

    private Result result;

    class Result {
        private List<String> availableLanguages;
        private NewsData kr;
        private NewsData en;

        // Getter, Setter, toString 등 생략
    }

    // 뉴스 데이터 클래스
    class NewsData {
        private String id;
        private String title;
        private List<String> summarySentences;
        private String sentiment;
        private List<NewsContent> content;
        private Source source;
        private List<String> stockCodes;
        private List<String> companyCodes;
        private List<String> writers;
        private List<String> imageUrls;
        private String linkUrl;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        // Getter, Setter, toString 등 생략
    }

    // 개별 콘텐츠를 위한 클래스
    class NewsContent {
        private String type;
        private String content;
        private String caption;

        // Getter, Setter, toString 등 생략
    }

    // 뉴스 소스 정보를 위한 클래스
    class Source {
        private String code;
        private String name;
        private String faviconUrl;
        private String logoImageUrl;
        private String logoImageUrlDark;

        // Getter, Setter, toString 등 생략
    }
}
