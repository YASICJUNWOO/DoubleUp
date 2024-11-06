package com.junwoo.doubleup.domain.goal;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goal")
@RequiredArgsConstructor
public class GoalController {

    private final MemberGetService memberGetService;

    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper = GoalMapper.INSTANCE;

    @GetMapping
    public List<Goal> getGoal(@RequestParam(name = "memberId") Long memberId) {
        return goalRepository.findAllByMemberId(memberId);
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

    @PostMapping("/sub")
    @Transactional
    public Goal createSubGoal(@RequestBody SubGoalRequest subGoalRequest) {
        Member member = memberGetService.findById(subGoalRequest.getMemberId());
        Goal goal = goalMapper.toEntity(subGoalRequest, member);
        return goalRepository.save(goal);
    }

    @DeleteMapping("/{goalId}")
    public void deleteGoal(@PathVariable Long goalId) {
        goalRepository.deleteById(goalId);
    }

}
