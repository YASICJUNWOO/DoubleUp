package com.junwoo.doubleup.domain.goalRoadMap.repository;

import com.junwoo.doubleup.domain.goalRoadMap.entity.GoalRoadmap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GoalRoadMapRepository extends JpaRepository<GoalRoadmap, Long> {
    Optional<GoalRoadmap> findByMemberId(Long memberId);
}
