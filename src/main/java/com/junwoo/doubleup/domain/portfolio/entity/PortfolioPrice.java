package com.junwoo.doubleup.domain.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

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
    private Portfolio portfolio;

    // 특정 날짜 또는 시간
    @Column(nullable = false)
    private LocalDate date;  // 날짜 기준으로 하며, 필요 시 LocalDateTime으로 변경 가능

    // 해당 시점의 포트폴리오 전체 가치
    @Column(nullable = false)
    private BigDecimal totalValue;

    // 초기 시점 대비 변화율 (누적 수익률)
    @Column(nullable = true)
    private BigDecimal initialChangeRate;

    // 초기 시점 대비 가치 차이 (누적 수익 금액)
    @Column(nullable = true)
    private BigDecimal initialChangeAmount;

    // 직전 시점 대비 변화율 (구간 수익률)
    @Column(nullable = true)
    private BigDecimal previousChangeRate;

    // 직전 시점 대비 가치 차이 (구간 수익 금액)
    @Column(nullable = true)
    private BigDecimal previousChangeAmount;
}
