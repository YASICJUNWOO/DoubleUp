package com.junwoo.doubleup.domain.goalRoadMap.service;

import com.junwoo.doubleup.domain.goalRoadMap.entity.GoalRoadmap;
import com.junwoo.doubleup.domain.goalRoadMap.repository.GoalRoadMapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GoalRoadMapGetService {

    private final GoalRoadMapRepository goalRoadMapRepository;

    @Transactional(readOnly = true)
    public GoalRoadmap getGoalRoadmapById(Long goalRoadMapId) {
        return goalRoadMapRepository.findById(goalRoadMapId)
                .orElseThrow(() -> new IllegalArgumentException("해당 목표 로드맵이 존재하지 않습니다."));
    }

    @Transactional(readOnly = true)
    public GoalRoadmap getGoalRoadmapByMemberId(Long memberId) {
        return goalRoadMapRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버의 목표 로드맵이 존재하지 않습니다."));
    }
}
