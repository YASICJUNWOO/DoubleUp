package com.junwoo.doubleup.domain.goalRoadMap;

import com.junwoo.doubleup.domain.goalRoadMap.dto.GoalRoadMapRequest;
import com.junwoo.doubleup.domain.goalRoadMap.entity.GoalRoadmap;
import com.junwoo.doubleup.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {GoalRoadMapDetailMapper.class})
public interface GoalRoadMapMapper {

    @Mapping(target="id", ignore = true)
    GoalRoadmap toGoalRoadmap(GoalRoadMapRequest goalRoadMapRequest, Member member);
}
