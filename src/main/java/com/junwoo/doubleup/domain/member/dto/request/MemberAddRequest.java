package com.junwoo.doubleup.domain.member.dto.request;

import lombok.Data;

@Data
public class MemberAddRequest {
	private String email;
	private String password;
	private String name;
}