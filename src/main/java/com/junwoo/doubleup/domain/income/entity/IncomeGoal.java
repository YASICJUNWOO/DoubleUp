package com.junwoo.doubleup.domain.income.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.junwoo.doubleup.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class IncomeGoal {

    @Id
    @GeneratedValue
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Comment("목표 범위 타입")
    @Enumerated(EnumType.STRING)
    private IncomeGoalRangeType rangeType;

    @Comment("목표 년도")
    private int yearValue;

    @Comment("목표 월")
    @Column(nullable = true)
    private Integer monthValue;

    @Comment("목표 금액")
    private BigDecimal goalAmount;

    public void updateIncomeGoal(IncomeGoal updateIncomeGoal) {
        this.rangeType = updateIncomeGoal.getRangeType();
        this.yearValue = updateIncomeGoal.getYearValue();
        this.monthValue = updateIncomeGoal.getMonthValue();
        this.goalAmount = updateIncomeGoal.getGoalAmount();
    }
}
