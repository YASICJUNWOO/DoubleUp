package com.junwoo.doubleup.domain.income.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class IncomeDetail {

    @Id
    @GeneratedValue
    private Long id;

    @Comment("구분")
    @Enumerated(EnumType.STRING)
    private IncomeType type;

    @Comment("카테고리")
    @Enumerated(EnumType.STRING)
    private IncomeCategory category;

    @Comment("내용")
    private String content;

    @Comment("금액")
    private BigDecimal amount;

    @Comment("일시")
    private LocalDateTime date;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "income_id")
    private Income income;

    public void updateIncomeDetail(IncomeDetail incomeDetail) {
        this.type = incomeDetail.getType();
        this.category = incomeDetail.getCategory();
        this.content = incomeDetail.getContent();
        this.amount = incomeDetail.getAmount();
        this.date = incomeDetail.getDate();
    }
}
