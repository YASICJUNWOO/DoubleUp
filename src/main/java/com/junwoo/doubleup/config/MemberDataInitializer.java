package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberDataInitializer implements DataInitializer {

	private final MemberService memberService;

	@Override
	public void init() {

		Member member = Member.builder()
				.id(2L)
				.email("testEmail@gmail.com")
				.password("testPassword")
				.name("testName")
				.build();

		Member admin = Member.builder()
				.id(1L)
				.email("admin")
				.password("admin")
				.name("admin")
				.build();

		memberService.addMember(member);
		memberService.addMember(admin);
	}

}
