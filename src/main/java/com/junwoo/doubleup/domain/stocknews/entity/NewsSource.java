package com.junwoo.doubleup.domain.stocknews.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class NewsSource {

    private String code;
    private String name;
    private String faviconUrl;
    private String logoImageUrl;
    private String logoImageUrlDark;

}
