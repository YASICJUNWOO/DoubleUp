package com.junwoo.doubleup.domain.income.dto;

import com.junwoo.doubleup.domain.income.entity.IncomeGoal;
import com.junwoo.doubleup.domain.member.entity.Member;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class IncomeGoalMapperImpl implements IncomeGoalMapper {

    @Override
    public IncomeGoal toEntity(Member member, IncomeGoal incomeGoal) {
        if ( member == null && incomeGoal == null ) {
            return null;
        }

        IncomeGoal.IncomeGoalBuilder incomeGoal1 = IncomeGoal.builder();

        if ( incomeGoal != null ) {
            incomeGoal1.monthValue( incomeGoal.getMonthValue() );
            incomeGoal1.yearValue( incomeGoal.getYearValue() );
            incomeGoal1.rangeType( incomeGoal.getRangeType() );
            incomeGoal1.goalAmount( incomeGoal.getGoalAmount() );
        }
        incomeGoal1.member( member );

        return incomeGoal1.build();
    }
}
