package com.junwoo.doubleup.domain.member.controller;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.repository.MemberRepository;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import com.junwoo.doubleup.domain.member.service.MemberService;
import com.junwoo.doubleup.domain.member.mapper.MemberMapper;
import com.junwoo.doubleup.domain.member.dto.request.MemberAddRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

	private final MemberService memberService;
	private final MemberGetService memberGetService;
	private final MemberMapper memberMapper = MemberMapper.INSTANCE;

	@GetMapping
	private List<Member> findAll() {
		return memberGetService.findAll();
	}

	@GetMapping("/{id}")
	private Member findById(@PathVariable Long id) {
		return memberGetService.findById(id);
	}

	@PostMapping
	private Member save(@RequestBody MemberAddRequest request) {
		Member entity = memberMapper.toEntity(request);
		return memberService.addMember(entity);
	}

	@DeleteMapping("/{id}")
	private void delete(@PathVariable Long id) {
		memberService.deleteMember(id);
	}

}
