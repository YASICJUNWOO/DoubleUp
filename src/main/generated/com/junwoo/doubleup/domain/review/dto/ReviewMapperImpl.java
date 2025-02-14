package com.junwoo.doubleup.domain.review.dto;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.review.entity.Review;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public Review toEntity(Member member, Stock stock, ReviewRequest reviewRequest) {
        if ( member == null && stock == null && reviewRequest == null ) {
            return null;
        }

        Review.ReviewBuilder review = Review.builder();

        if ( reviewRequest != null ) {
            review.content( reviewRequest.getContent() );
        }
        review.member( member );
        review.stock( stock );

        return review.build();
    }
}
