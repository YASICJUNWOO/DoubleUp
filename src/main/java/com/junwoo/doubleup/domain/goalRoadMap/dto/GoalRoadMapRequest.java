package com.junwoo.doubleup.domain.goalRoadMap.dto;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
@Data
public class GoalRoadMapRequest {

    private int age;
    private int startYear;
    private int endYear;
    private String goalAmount;
    private String currentProgressAmount;
    private List<GoalRoadMapDetailRequest> goalRoadMapDetails;

    @Getter
    @Data
    public static class GoalRoadMapDetailRequest {
        private int yearValue;
        private String goalAmount;
    }
}
