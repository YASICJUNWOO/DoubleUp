package com.junwoo.doubleup.outapi.lsapi;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class LsApiService {

    public void getToken() {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://openapi.ls-sec.co.kr:8080")
                .build();

        //grant_type	권한부여 Type	String	Y	100	"client_credentials" 고정
        //appkey	고객 앱Key	String	Y	36	포탈에서 발급된 고객의 앱Key
        //appsecretkey	고객 앱 비밀Key	String	Y	36	포탈에서 발급된 고객의 앱 비밀Key
        //scope	scope	String	Y	256	"oob" 고정

        webClient.post()
                .uri("/oauth2/token")
                .contentType("application/x-www-form-urlencoded")
                .bodyValue("grant_type=client_credentials&appkey=appkey&appsecretkey=appsecretkey&scope=oob")
    }

    public void getKrStocks() {

    }
}
