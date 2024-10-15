package com.junwoo.doubleup.security;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MemberGetService memberGetService;

    @GetMapping("/member")
    public Member member(@AuthenticationPrincipal User user) {
        return memberGetService.findByEmail(user.getUsername());
    }

}
