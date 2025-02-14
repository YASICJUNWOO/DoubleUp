package com.junwoo.doubleup.domain.income.dto;

import com.junwoo.doubleup.domain.income.entity.IncomeGoal;
import com.junwoo.doubleup.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface IncomeGoalMapper {

    IncomeGoalMapper INSTANCE = Mappers.getMapper(IncomeGoalMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "monthValue", source = "incomeGoal.monthValue")
    @Mapping(target = "yearValue", source = "incomeGoal.yearValue")
    @Mapping(target = "member", source = "member")
    IncomeGoal toEntity(Member member, IncomeGoal incomeGoal);
}
