package com.junwoo.doubleup.outapi.lsapi;

import lombok.Data;

@Data
public class TokenDto {

    private String access_token;
    private String scope;
    private String token_type;
    private int expires_in;
}
