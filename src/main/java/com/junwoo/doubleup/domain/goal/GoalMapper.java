package com.junwoo.doubleup.domain.goal;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GoalMapper {

    GoalMapper INSTANCE = Mappers.getMapper(GoalMapper.class);

    Goal toEntity(GoalRequest goalRequest);

    GoalDetail toEntity(GoalRequest.GoalDetail goalDetail);
}
