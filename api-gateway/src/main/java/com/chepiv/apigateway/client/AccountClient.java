package com.chepiv.apigateway.client;

import com.chepiv.apigateway.model.Account;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.CollectionModel;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;



@Component
@FeignClient("account-service")
public interface AccountClient {
    @GetMapping("/accounts")
    @CrossOrigin
    CollectionModel<Account> readCars();
}