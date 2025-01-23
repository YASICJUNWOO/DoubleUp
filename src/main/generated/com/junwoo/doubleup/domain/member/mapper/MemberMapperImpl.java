package com.junwoo.doubleup.domain.member.mapper;

import com.junwoo.doubleup.domain.member.dto.request.MemberAddRequest;
import com.junwoo.doubleup.domain.member.entity.Member;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member toEntity(MemberAddRequest request) {
        if ( request == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.email( request.getEmail() );
        member.password( request.getPassword() );
        member.name( request.getName() );

        return member.build();
    }
}
