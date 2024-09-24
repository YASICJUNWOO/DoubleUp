package com.junwoo.doubleup.domain.member.mapper;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.dto.request.MemberAddRequest;
import org.mapstruct.Mapper;

import static org.mapstruct.factory.Mappers.getMapper;

@Mapper
public interface MemberMapper {

	MemberMapper INSTANCE = getMapper(MemberMapper.class);

	// MemberAddRequest to Member
	Member toEntity(MemberAddRequest request);

}
