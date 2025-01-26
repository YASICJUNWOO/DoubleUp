package com.junwoo.doubleup.domain.income.dto;

import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.income.entity.IncomeDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface IncomeDetailMapper {

    IncomeDetailMapper INSTANCE = Mappers.getMapper(IncomeDetailMapper.class);

    @Mapping(target = "income", source = "income")
    @Mapping(target = "id", ignore = true)
    IncomeDetail toIncomeDetail(Income income, IncomeDetailRequest incomeDetailRequest);
}
