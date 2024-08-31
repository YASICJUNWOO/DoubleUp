package com.junwoo.doubleup.domain.member.repository;

import com.junwoo.doubleup.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
