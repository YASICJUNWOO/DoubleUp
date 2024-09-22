package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberDataInitializer implements DataInitializer {

	private final MemberRepository memberRepository;

	@Override
	public void init() {

		Member member = Member.builder()
				.id(1L)
				.email("testEmail@gmail.com")
				.password("testPassword")
				.name("testName")
				.build();

		memberRepository.save(member);
	}

}
