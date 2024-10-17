package com.junwoo.doubleup.domain.member.entity;

import com.junwoo.doubleup.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.Comment;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Comment("이메일")
	private String email;

	@Setter
	@Comment("비밀번호")
	private String password;

	@Comment("이름")
	private String name;

}
