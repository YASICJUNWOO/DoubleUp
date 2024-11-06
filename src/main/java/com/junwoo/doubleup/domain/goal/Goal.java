package com.junwoo.doubleup.domain.goal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.junwoo.doubleup.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Comment("목표 이름")
    private String goalName;

    @Comment("목표 유형")
    @Enumerated(EnumType.STRING)
    private GoalType goalType;

    @Comment("원금")
    private BigDecimal initialAmount;

    @Comment("목표 금액")
    private BigDecimal goalAmount;

    @Comment("적립 주기")
    @Enumerated(EnumType.STRING)
    private InstallmentFrequencyType installmentFrequency;

    @Comment("적립 금액")
    private BigDecimal installmentAmount;

    @Comment("누적 금액")
    @Builder.Default
    private BigDecimal currentAmount = BigDecimal.ZERO;

    @Comment("시작 날짜")
    private LocalDateTime startDate;

    @Comment("목표 날짜")
    private LocalDateTime endDate;

    @Builder.Default
    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GoalDetail> goalDetails = List.of();

}
