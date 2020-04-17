package com.chepiv.offersservice.utils;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AccountUtils {

    public static Long extractOauth2AccountId(OAuth2Authentication user) {
        Map<String,Object> userDetails= ((Map<String, Map>) user.getUserAuthentication().getDetails()).get("user-details");
        return new Long(userDetails.get("id").toString());
    }

    public static String extractLogin(OAuth2Authentication user) {
        Map<String,Object> userDetails= ((Map<String, Map>) user.getUserAuthentication().getDetails()).get("user-details");
        return userDetails.get("login").toString();
    }
}
