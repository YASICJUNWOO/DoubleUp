package com.junwoo.doubleup.domain.stocknews.entity;

import com.junwoo.doubleup.BaseTimeEntity;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class News extends BaseTimeEntity {

    @Id
    private String id;

//{
//        "id": "maekyung_000011150984",
//        "title": "“다음주 큰 거 온다”…M7 실적시즌 개막 속 국내 증시는 어디로",
//        "summary": "미국 전기차업체 테슬라를 시작으로 빅테크 그룹 ‘매그니피센트7’(M7)의 실적 발표가 이어지면서 국내 증시의 향방에 투자자들의 관심이 모인다. 증권가에서는 잇달아 공개될 이들 기업...",
//        "contentText": "미국 전기차업체 테슬라를 시작으로 빅테크 그룹 ‘매그니피센트7’(M7)의 실적 발표가 이어지면서 국내 증시의 향방에 투자자들의 관심이 모인다. 증권가에서는 잇달아 공개될 이들 기업...",
//        "imageUrls": [
//          "https://wimg.mk.co.kr/news/cms/202410/26/rcv.YNA.20240919.PYH2024091909500001300_P1.jpg"
//        ],
//        "source": {
//          "code": "maekyung",
//          "name": "매일경제",
//          "faviconUrl": "https://static.tossinvestcdn.com/assets/image/press/maekyung_favicon.png",
//          "logoImageUrl": "https://static.tossinvestcdn.com/assets/image/press/maekyung_full.png",
//          "logoImageUrlDark": "https://static.tossinvestcdn.com/assets/image/press/maekyung_full_dark.png"
//        },
//        "relatedNews": [],
//        "stockCodes": null,
//        "stockInfo": null,
//        "createdAt": "2024-10-26T13:30:19",
//        "updatedAt": "2024-10-26T13:30:19"
//      }

    private String title;
    private String summary;
    private String imageUrl;

    @Lob
    private String totalContent;

    @Embedded
    private NewsSource source;
}
