package com.junwoo.doubleup.domain.member.service;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	public Member addMember(Member member) {

		// 비밀번호 암호화
		member.setPassword(passwordEncoder.encode(member.getPassword()));

		return memberRepository.save(member);
	}

	@Transactional
	public void deleteMember(Long id) {
		memberRepository.deleteById(id);
	}
}
