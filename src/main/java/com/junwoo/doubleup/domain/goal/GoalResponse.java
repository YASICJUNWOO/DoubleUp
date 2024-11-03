package com.junwoo.doubleup.domain.goal;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class GoalResponse {

    private Long id;
    private String initialAmount;
    private String goalAmount;
    private List<GoalDetail> goalDetails;

}
