package com.junwoo.doubleup.domain.goalRoadMap.controller;

import com.junwoo.doubleup.domain.goalRoadMap.GoalRoadMapMapper;
import com.junwoo.doubleup.domain.goalRoadMap.dto.GoalRoadMapRequest;
import com.junwoo.doubleup.domain.goalRoadMap.entity.GoalRoadmap;
import com.junwoo.doubleup.domain.goalRoadMap.service.GoalRoadMapGetService;
import com.junwoo.doubleup.domain.goalRoadMap.service.GoalRoadMapService;
import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "장기 목표 로드맵", description = "목표 로드맵 API")
@RestController
@RequestMapping("/api/goal-road-map")
@RequiredArgsConstructor
public class GoalRoadMapController {

    private final GoalRoadMapService goalRoadMapService;
    private final GoalRoadMapGetService goalRoadMapGetService;
    private final MemberGetService memberGetService;

    private final GoalRoadMapMapper goalRoadMapMapper;

    @Operation(summary = "해당 회원 목표 로드맵 조회", description = "해당 회원의 목표 로드맵을 조회합니다.")
    @GetMapping
    public GoalRoadmap getGoalRoadmap() {
        Member member = memberGetService.findById(1L);
        return goalRoadMapGetService.getGoalRoadmapByMemberId(member.getId());
    }

    @Operation(summary = "목표 로드맵 생성", description = "목표 로드맵을 생성합니다.")
    @PostMapping
    public GoalRoadmap createGoalRoadmap(@RequestBody GoalRoadMapRequest dto) {
        Member member = memberGetService.findById(1L);
        GoalRoadmap goalRoadmap = goalRoadMapMapper.toGoalRoadmap(dto, member);
        return goalRoadMapService.createGoalRoadMap(goalRoadmap);
    }

    @Operation(summary = "목표 로드맵 수정", description = "목표 로드맵을 수정합니다.")
    @PatchMapping("/{id}")
    public void updateGoalRoadmap(@PathVariable Long id, @RequestBody GoalRoadMapRequest dto) {
        Member member = memberGetService.findById(1L);
        GoalRoadmap goalRoadmap = goalRoadMapMapper.toGoalRoadmap(dto, member);
        goalRoadMapService.updateGoalRoadmap(id, goalRoadmap);
    }

    @Operation(summary = "장기 목표 로드맵 삭제", description = "장기 목표 로드맵을 삭제합니다.")
    @DeleteMapping("/{id}")
    public void deleteGoalRoadmap(@PathVariable Long id) {
        goalRoadMapService.deleteGoalRoadmap(id);
    }

}
