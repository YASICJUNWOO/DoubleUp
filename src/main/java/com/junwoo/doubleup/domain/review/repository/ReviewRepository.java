package com.junwoo.doubleup.domain.review.repository;

import com.junwoo.doubleup.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByStock_StockId(Long stockId);

    List<Review> findByMember_Id(Long userId);
}
