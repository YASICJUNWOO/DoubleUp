package com.junwoo.doubleup.domain.goal;

import com.junwoo.doubleup.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GoalMapper {

    GoalMapper INSTANCE = Mappers.getMapper(GoalMapper.class);

    @Mapping(target = "id", ignore = true)
    Goal toEntity(GoalRequest goalRequest, Member member);

    GoalDetail toEntity(GoalRequest.GoalDetail goalDetail);
}
