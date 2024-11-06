package com.junwoo.doubleup.domain.goal;

import com.junwoo.doubleup.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface GoalMapper {

    GoalMapper INSTANCE = Mappers.getMapper(GoalMapper.class);

    @Mapping(target = "id", ignore = true)
    Goal toEntity(GoalRequest goalRequest, Member member);

    GoalDetail toEntity(GoalRequest.GoalDetail goalDetail);

    //  private List<LocalDate> goalPeriod; // 목표 기간
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "member", source = "member")
    @Mapping(target = "startDate", expression = "java(mapStartDate(subGoalRequest.getGoalPeriod()))")
    @Mapping(target = "endDate", expression = "java(mapEndDate(subGoalRequest.getGoalPeriod()))")
    Goal toEntity(SubGoalRequest subGoalRequest, Member member);

    // 첫 번째 날짜를 startDate로 매핑
    default LocalDateTime mapStartDate(List<LocalDate> goalPeriod) {
        return goalPeriod != null && !goalPeriod.isEmpty() ? goalPeriod.get(0).atStartOfDay() : null;
    }

    // 두 번째 날짜를 endDate로 매핑
    default LocalDateTime mapEndDate(List<LocalDate> goalPeriod) {
        return goalPeriod != null && goalPeriod.size() > 1 ? goalPeriod.get(1).atStartOfDay() : null;
    }

}
