package com.chepiv.chatservice.mapper;

import com.chepiv.chatservice.dto.MessageDto;
import com.chepiv.chatservice.model.Message;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class MessageMapper {

    public MessageDto map(Message message) {
        return new MessageDto(message.getId(),
                message.getMessageText(),
                message.getAccountId(),
                message.getAccountName(),
                message.getExchangeOfferId(),
                message.getDate().format(DateTimeFormatter.ofPattern("MM-dd HH:mm:ss")));
    }

}
