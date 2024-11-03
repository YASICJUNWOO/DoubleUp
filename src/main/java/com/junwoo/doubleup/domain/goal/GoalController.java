package com.junwoo.doubleup.domain.goal;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goal")
@RequiredArgsConstructor
public class GoalController {

    private final MemberGetService memberGetService;

    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper = GoalMapper.INSTANCE;

    @GetMapping
    public Goal getGoal(@RequestParam(name = "memberId") Long memberId) {
        return goalRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자의 목표가 없습니다."));
    }

    @PostMapping
    @Transactional
    public Goal createGoal(@RequestBody GoalRequest goalRequest) {
        Member member = memberGetService.findById(goalRequest.getMemberId());
        Goal goal = goalMapper.toEntity(goalRequest, member);
        // GoalDetail 객체들을 Goal에 추가
        for (GoalDetail detail : goal.getGoalDetails()) {
            detail.setGoal(goal);
        }

        return goalRepository.save(goal);
    }

}
