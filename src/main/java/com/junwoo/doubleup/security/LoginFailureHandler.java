package com.junwoo.doubleup.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class LoginFailureHandler implements AuthenticationFailureHandler {


    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {

        // HTTP 상태 코드를 401 Unauthorized로 설정
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // JSON 응답의 Content-Type을 설정
        response.setContentType("application/json;charset=UTF-8");

        // 에러 메시지 작성 및 응답으로 전송
        String json = String.format("{\"error\": \"%s\", \"message\": \"Invalid email or password\"}", exception.getMessage());
        response.getWriter().write(json);
    }
}
