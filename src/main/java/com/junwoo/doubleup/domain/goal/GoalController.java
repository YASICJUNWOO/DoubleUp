package com.junwoo.doubleup.domain.goal;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goal")
@RequiredArgsConstructor
public class GoalController {

    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper = GoalMapper.INSTANCE;

    @GetMapping
    public Goal getGoal(@RequestParam(name = "memberId") Long memberId) {
        return goalRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자의 목표가 없습니다."));
    }

    @PostMapping
    public Goal createGoal(@RequestBody GoalRequest goalRequest) {
        Goal goal = goalMapper.toEntity(goalRequest);
        return goalRepository.save(goal);
    }

}
