package com.chepiv.chatservice.service;

import com.chepiv.chatservice.dto.MessageDto;
import com.chepiv.chatservice.mapper.MessageMapper;
import com.chepiv.chatservice.model.Message;
import com.chepiv.chatservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;

    @Autowired
    public MessageService(MessageRepository messageRepository, MessageMapper messageMapper) {
        this.messageRepository = messageRepository;
        this.messageMapper = messageMapper;
    }


    public List<Message> getAll() {
        return messageRepository.findAll();
    }

    public Message postMessage(Message message) {
        message.setDate(LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<MessageDto> getHistoryForOffer(Long offerId) {
        return messageRepository.getAllByExchangeOfferIdOrderByDateAsc(offerId)
                .stream()
                .map(messageMapper::map)
                .collect(Collectors.toList());
    }
}
