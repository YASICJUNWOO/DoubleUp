package com.junwoo.doubleup.domain.income.entity;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum IncomeCategory {

    // 수입 카테고리
    SALARY("급여"),
    ALLOWANCE("수당"),
    BONUS("상여"),
    INCOME_ETC("기타"),

    // 지출 카테고리
    FOOD("식비"),
    CLOTHES("의류"),
    TRANSPORTATION("교통"),
    COMMUNICATION("통신"),
    CULTURE("문화"),
    EDUCATION("교육"),
    MEDICAL("의료"),
    INSURANCE("보험"),
    TAX("세금"),
    PAY_ETC("기타");

    private final String category;

}
