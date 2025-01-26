package com.junwoo.doubleup.domain.income.entity;

import com.junwoo.doubleup.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "income", cascade = CascadeType.ALL)
    private List<IncomeDetail> incomeDetails = new ArrayList<>();

    public void updateIncome(Income income) {
        this.income = income.getIncome();
        this.expense = income.getExpense();
        this.totalIncome = income.getTotalIncome();
    }

    public void addIncomeDetail(IncomeDetail incomeDetail) {
        this.incomeDetails.add(incomeDetail);
        this.income = this.income.add(incomeDetail.getAmount());
        this.totalIncome = this.income.subtract(this.expense);
    }

    public void addExpenseDetail(IncomeDetail incomeDetail) {
        this.incomeDetails.add(incomeDetail);
        this.expense = this.expense.add(incomeDetail.getAmount());
        this.totalIncome = this.income.subtract(this.expense);
    }

}
