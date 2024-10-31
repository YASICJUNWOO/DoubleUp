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

    static class GoalDetail {
        private String year;
        private String goalAmount;
    }
}
