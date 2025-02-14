package com.junwoo.doubleup.domain.goalRoadMap.service;

import com.junwoo.doubleup.domain.goalRoadMap.entity.GoalRoadMapDetail;
import com.junwoo.doubleup.domain.goalRoadMap.entity.GoalRoadmap;
import com.junwoo.doubleup.domain.goalRoadMap.repository.GoalRoadMapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalRoadMapService {

    private final GoalRoadMapRepository goalRoadMapRepository;
    private final GoalRoadMapGetService goalRoadMapGetService;

    @Transactional
    public GoalRoadmap createGoalRoadMap(GoalRoadmap goalRoadMap) {
        List<GoalRoadMapDetail> goalRoadMapDetails = goalRoadMap.getGoalRoadMapDetails();
        goalRoadMap.setGoalRoadMapDetails(null);
        GoalRoadmap savedGoalRoadMap = goalRoadMapRepository.save(goalRoadMap);

        savedGoalRoadMap.addGoalRoadMapDetails(goalRoadMapDetails);
        return savedGoalRoadMap;
    }

    @Transactional
    public void updateGoalRoadmap(Long id, GoalRoadmap goalRoadmap) {
        GoalRoadmap goalRoadmapById = goalRoadMapGetService.getGoalRoadmapById(id);
        goalRoadmapById.update(goalRoadmap);
    }

    @Transactional
    public void deleteGoalRoadmap(Long id) {
        goalRoadMapRepository.deleteById(id);
    }
}
