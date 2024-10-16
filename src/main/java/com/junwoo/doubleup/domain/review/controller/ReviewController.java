package com.junwoo.doubleup.domain.review.controller;

import com.junwoo.doubleup.domain.review.dto.ReviewRequest;
import com.junwoo.doubleup.domain.review.entity.Review;
import com.junwoo.doubleup.domain.review.service.ReviewGetService;
import com.junwoo.doubleup.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewGetService reviewGetService;

    @PostMapping
    public void saveReview(@RequestBody ReviewRequest reviewRequest) {
        reviewService.saveReview(reviewRequest);
    }

    @GetMapping("/stock")
    public List<Review> findByStockId(@RequestParam(name = "stockId") Long stockId) {
        return reviewGetService.getReviewListByStockId(stockId);
    }

    @GetMapping("/member")
    public List<Review> findByMemberId(@RequestParam(name = "memberId") Long memberId) {
        return reviewGetService.getReviewListByUserId(memberId);
    }

}
