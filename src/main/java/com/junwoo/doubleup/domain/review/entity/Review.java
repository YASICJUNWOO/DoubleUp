package com.junwoo.doubleup.domain.review.entity;

import com.junwoo.doubleup.BaseTimeEntity;
import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Review extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private int rating;

    private String content;
}
