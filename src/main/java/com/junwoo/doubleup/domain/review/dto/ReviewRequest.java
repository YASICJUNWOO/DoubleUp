package com.junwoo.doubleup.domain.review.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReviewRequest {

    private Long stockId;
    private Long memberId;

    private String content;
}
