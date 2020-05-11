package com.chepiv.offersservice.client;

import com.chepiv.offersservice.client.reponsedata.Account;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient("account-service")
public interface AccountClient {

    @GetMapping("accounts/byId/{id}")
    Account getUserById(@PathVariable("id") Long id, @RequestHeader(value = "Authorization") String authorizationHeader);
}
