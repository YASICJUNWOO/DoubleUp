package com.junwoo.doubleup.domain.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PortfolioPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 포트폴리오 참조
    @ManyToOne
    @JoinColumn(name = "portfolio_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) // 포트폴리오 삭제 시 해당 포트폴리오의 가격 정보도 삭제
    private Portfolio portfolio;

    // 특정 날짜 또는 시간
    @Column(nullable = false)
    private LocalDateTime date;  // 날짜 기준으로 하며, 필요 시 LocalDateTime으로 변경 가능

    @Column(nullable = false)
    private BigDecimal totalInvestment;

    // 해당 시점의 포트폴리오 전체 가치
    @Column(nullable = false)
    private BigDecimal totalValue;

}