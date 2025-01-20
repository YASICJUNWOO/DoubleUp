package com.junwoo.doubleup.domain.income.entity;

import com.junwoo.doubleup.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;

@Getter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Income {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Comment("년")
    private int yearValue;

    @Comment("월")
    private int monthValue;

    @Comment("수입 금액")
    private BigDecimal income;

    @Comment("지출 금액")
    private BigDecimal expense;

    @Comment("순수입")
    private BigDecimal totalIncome;

    public void updateIncome(Income income) {
        this.income = income.getIncome();
        this.expense = income.getExpense();
        this.totalIncome = income.getTotalIncome();
    }
}
