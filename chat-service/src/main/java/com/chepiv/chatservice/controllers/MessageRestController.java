package com.chepiv.chatservice.controllers;

import com.chepiv.chatservice.dto.MessageDto;
import com.chepiv.chatservice.model.Message;
import com.chepiv.chatservice.service.MessageService;
import com.chepiv.chatservice.utils.AccountUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("message")
public class MessageRestController {

    private final MessageService messageService;

    @Autowired
    public MessageRestController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    public ResponseEntity<List<Message>> getAll() {
        return ResponseEntity.ok(messageService.getAll());
    }

    @GetMapping("/history/{offerId}")
    public ResponseEntity<List<MessageDto>> getHistoryForOffer(@PathVariable("offerId") Long offerId) {
        return ResponseEntity.ok(messageService.getHistoryForOffer(offerId));
    }

    @PostMapping
    public ResponseEntity<Message> postMessage(@RequestBody Message message, OAuth2Authentication user) {
        message.setAccountId(AccountUtils.extractOauth2AccountId(user));
        message.setAccountName(AccountUtils.extractLogin(user));
        return ResponseEntity.ok(messageService.postMessage(message));
    }
}
