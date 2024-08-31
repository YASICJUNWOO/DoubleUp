package com.junwoo.doubleup.domain.member.service;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

	private final MemberRepository memberRepository;

	@Transactional
	public Member addMember(Member member) {
		return memberRepository.save(member);
	}

	@Transactional
	public void deleteMember(Long id) {
		memberRepository.deleteById(id);
	}
}
