package com.junwoo.doubleup.domain.goal;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class GoalRequest {

    private Long memberId;
    private String initialAmount;
    private String goalAmount;
    private String goalDate;
    private List<GoalDetail> goalDetails;

    @Builder
    @Data
    static class GoalDetail {
        private String goalYear;
        private String goalAmount;
    }
}
