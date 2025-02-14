package com.junwoo.doubleup.domain.goalRoadMap;

import com.junwoo.doubleup.domain.goalRoadMap.dto.GoalRoadMapRequest;
import com.junwoo.doubleup.domain.goalRoadMap.entity.GoalRoadMapDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GoalRoadMapDetailMapper {

    GoalRoadMapDetail toGoalRoadMapDetail(GoalRoadMapRequest.GoalRoadMapDetailRequest goalRoadMapDetailRequest);
}
