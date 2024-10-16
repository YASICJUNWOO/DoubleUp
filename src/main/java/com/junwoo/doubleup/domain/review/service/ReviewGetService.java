package com.junwoo.doubleup.domain.review.service;

import com.junwoo.doubleup.domain.review.entity.Review;
import com.junwoo.doubleup.domain.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewGetService {

    private final ReviewRepository reviewRepository;

    // stock의 모든 리뷰를 가져오는 메소드
    public List<Review> getReviewListByStockId(Long stockId) {
        return reviewRepository.findByStock_StockId(stockId);
    }

    // user의 모든 리뷰를 가져오는 메소드
    public List<Review> getReviewListByUserId(Long memberId) {
        return reviewRepository.findByMember_Id(memberId);
    }

}
