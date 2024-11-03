package com.junwoo.doubleup.domain.goal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Builder
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class GoalDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "goal_id")
    private Goal goal;

    private String goalYear;

    private BigDecimal goalAmount;
}
