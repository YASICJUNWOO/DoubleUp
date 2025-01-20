package com.junwoo.doubleup.domain.income.dto;

import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface IncomeMapper {

    IncomeMapper INSTANCE = Mappers.getMapper(IncomeMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "yearValue", source = "incomeRequestDto.year")
    @Mapping(target = "monthValue", source = "incomeRequestDto.month")
    @Mapping(target = "income", source = "incomeRequestDto.income")
    Income toEntity(Member member, IncomeRequestDto incomeRequestDto);

    @Mapping(target = "year", source = "yearValue")
    @Mapping(target = "month", source = "monthValue")
    @Mapping(target = "income", source = "income")
    IncomeResponseDto toResponse(Income income);
}
