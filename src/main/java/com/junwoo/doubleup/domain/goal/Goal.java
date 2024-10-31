package com.junwoo.doubleup.domain.goal;

import com.junwoo.doubleup.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;
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

    @OneToOne
    private Member member;

    @Comment("원금")
    private BigDecimal initialAmount;

    @Comment("목표 금액")
    private BigDecimal goalAmount;

    @Comment("목표 날짜")
    private String goalDate;

    @OneToMany(mappedBy = "goal")
    private List<GoalDetail> goalDetails;
}
