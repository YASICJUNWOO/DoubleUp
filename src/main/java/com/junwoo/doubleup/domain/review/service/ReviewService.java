package com.junwoo.doubleup.domain.review.service;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import com.junwoo.doubleup.domain.review.dto.ReviewMapper;
import com.junwoo.doubleup.domain.review.dto.ReviewRequest;
import com.junwoo.doubleup.domain.review.entity.Review;
import com.junwoo.doubleup.domain.review.repository.ReviewRepository;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.service.StockGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final MemberGetService memberGetService;
    private final StockGetService stockGetService;

    private final ReviewMapper reviewMapper = ReviewMapper.INSTANCE;

    @Transactional
    public void saveReview(ReviewRequest reviewRequest) {
        Member member = memberGetService.findById(reviewRequest.getMemberId());
        Stock stock = stockGetService.findById(reviewRequest.getStockId());

        Review entity = reviewMapper.toEntity(member, stock, reviewRequest);
        reviewRepository.save(entity);
    }

    @Transactional
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
