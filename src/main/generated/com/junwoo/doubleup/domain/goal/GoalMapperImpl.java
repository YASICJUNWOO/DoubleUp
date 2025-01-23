package com.junwoo.doubleup.domain.goal;

import com.junwoo.doubleup.domain.member.entity.Member;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class GoalMapperImpl implements GoalMapper {

    @Override
    public Goal toEntity(GoalRequest goalRequest, Member member) {
        if ( goalRequest == null && member == null ) {
            return null;
        }

        Goal.GoalBuilder goal = Goal.builder();

        if ( goalRequest != null ) {
            if ( goalRequest.getInitialAmount() != null ) {
                goal.initialAmount( new BigDecimal( goalRequest.getInitialAmount() ) );
            }
            if ( goalRequest.getGoalAmount() != null ) {
                goal.goalAmount( new BigDecimal( goalRequest.getGoalAmount() ) );
            }
            goal.goalDetails( goalDetailListToGoalDetailList( goalRequest.getGoalDetails() ) );
        }
        goal.member( member );

        return goal.build();
    }

    @Override
    public GoalDetail toEntity(GoalRequest.GoalDetail goalDetail) {
        if ( goalDetail == null ) {
            return null;
        }

        GoalDetail.GoalDetailBuilder goalDetail1 = GoalDetail.builder();

        goalDetail1.goalYear( goalDetail.getGoalYear() );
        if ( goalDetail.getGoalAmount() != null ) {
            goalDetail1.goalAmount( new BigDecimal( goalDetail.getGoalAmount() ) );
        }

        return goalDetail1.build();
    }

    @Override
    public Goal toEntity(SubGoalRequest subGoalRequest, Member member) {
        if ( subGoalRequest == null && member == null ) {
            return null;
        }

        Goal.GoalBuilder goal = Goal.builder();

        if ( subGoalRequest != null ) {
            goal.goalName( subGoalRequest.getGoalName() );
            goal.goalType( subGoalRequest.getGoalType() );
            goal.goalAmount( subGoalRequest.getGoalAmount() );
            goal.installmentFrequency( subGoalRequest.getInstallmentFrequency() );
            goal.installmentAmount( subGoalRequest.getInstallmentAmount() );
        }
        goal.member( member );
        goal.startDate( mapStartDate(subGoalRequest.getGoalPeriod()) );
        goal.endDate( mapEndDate(subGoalRequest.getGoalPeriod()) );

        return goal.build();
    }

    protected List<GoalDetail> goalDetailListToGoalDetailList(List<GoalRequest.GoalDetail> list) {
        if ( list == null ) {
            return null;
        }

        List<GoalDetail> list1 = new ArrayList<GoalDetail>( list.size() );
        for ( GoalRequest.GoalDetail goalDetail : list ) {
            list1.add( toEntity( goalDetail ) );
        }

        return list1;
    }
}
