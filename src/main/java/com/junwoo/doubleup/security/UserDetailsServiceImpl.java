package com.junwoo.doubleup.security;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberGetService memberGetService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member byEmail = memberGetService.findByEmail(username);
        return new User(byEmail.getEmail(), byEmail.getPassword(), AuthorityUtils.createAuthorityList("ROLE_USER"));
    }

}
