package com.junwoo.doubleup.domain.income;

import com.junwoo.doubleup.domain.income.dto.IncomeMapper;
import com.junwoo.doubleup.domain.income.dto.IncomeRequestDto;
import com.junwoo.doubleup.domain.income.dto.IncomeResponseDto;
import com.junwoo.doubleup.domain.income.entity.Income;
import com.junwoo.doubleup.domain.member.entity.Member;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-20T13:51:16+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class IncomeMapperImpl implements IncomeMapper {

    @Override
    public Income toEntity(Member member, IncomeRequestDto incomeRequestDto) {
        if ( member == null && incomeRequestDto == null ) {
            return null;
        }

        Income.IncomeBuilder income = Income.builder();

        if ( incomeRequestDto != null ) {
            income.yearValue( incomeRequestDto.getYear() );
            income.monthValue( incomeRequestDto.getMonth() );
            income.income( incomeRequestDto.getIncome() );
            income.expense( incomeRequestDto.getExpense() );
            income.totalIncome( incomeRequestDto.getTotalIncome() );
        }
        income.member( member );

        return income.build();
    }

    @Override
    public IncomeResponseDto toResponse(Income income) {
        if ( income == null ) {
            return null;
        }

        IncomeResponseDto.IncomeResponseDtoBuilder incomeResponseDto = IncomeResponseDto.builder();

        incomeResponseDto.year( income.getYearValue() );
        incomeResponseDto.month( income.getMonthValue() );
        incomeResponseDto.income( income.getIncome() );
        incomeResponseDto.id( income.getId() );
        incomeResponseDto.expense( income.getExpense() );
        incomeResponseDto.totalIncome( income.getTotalIncome() );

        return incomeResponseDto.build();
    }
}
