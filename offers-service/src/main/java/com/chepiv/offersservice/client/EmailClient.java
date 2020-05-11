package com.chepiv.offersservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "email-service")
public interface EmailClient {

    @PostMapping(value = "email")
    String sendEmail(@RequestParam("to") String to,
                     @RequestParam("subject") String subject,
                     @RequestParam("body") String body);
}
