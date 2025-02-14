package com.junwoo.doubleup.domain.goalRoadMap.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.junwoo.doubleup.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class GoalRoadmap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private int age; // 목표 설정 시 나이

    @Column(nullable = false)
    private int startYear; // 목표 시작 연도

    @Column(nullable = false)
    private int endYear; // 목표 종료 연도

    @Column(nullable = false)
    private BigDecimal goalAmount; // 목표 금액

    @Column(nullable = false)
    private BigDecimal currentProgressAmount = BigDecimal.ZERO; // 현재 진행 금액

    @Setter
    @OneToMany(mappedBy = "goalRoadmap", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GoalRoadMapDetail> goalRoadMapDetails; // 연도별 목표 금액 리스트

    public void update(GoalRoadmap goalRoadmap) {
        this.age = goalRoadmap.age;
        this.startYear = goalRoadmap.startYear;
        this.endYear = goalRoadmap.endYear;
        this.goalAmount = goalRoadmap.goalAmount;
        this.currentProgressAmount = goalRoadmap.currentProgressAmount;

        addGoalRoadMapDetails(goalRoadmap.goalRoadMapDetails);
    }

    public void addGoalRoadMapDetails(List<GoalRoadMapDetail> goalRoadMapDetails) {
        this.goalRoadMapDetails.clear();
        this.goalRoadMapDetails.addAll(goalRoadMapDetails);
        for (GoalRoadMapDetail goalRoadMapDetail : goalRoadMapDetails) {
            goalRoadMapDetail.assignGoalRoadMap(this);
        }
    }
}
