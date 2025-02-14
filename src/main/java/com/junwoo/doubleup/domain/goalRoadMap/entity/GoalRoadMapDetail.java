package com.junwoo.doubleup.domain.goalRoadMap.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class GoalRoadMapDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal_roadmap_id", nullable = false)
    private GoalRoadmap goalRoadmap;

    @Column(nullable = false)
    private int yearValue; // 특정 연도

    @Column(nullable = false)
    private BigDecimal goalAmount; // 해당 연도의 목표 금액

    public void assignGoalRoadMap(GoalRoadmap goalRoadmap) {
        this.goalRoadmap = goalRoadmap;
    }
}
