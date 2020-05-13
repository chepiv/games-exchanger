package com.chepiv.chatservice.service;

import com.chepiv.chatservice.model.Message;
import com.chepiv.chatservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }


    public List<Message> getAll() {
        return messageRepository.findAll();
    }

    public Message postMessage(Message message) {
        message.setDate(new Date(System.currentTimeMillis()));
        return messageRepository.save(message);
    }

    public List<Message> getHistoryForOffer(Long offerId) {
        return messageRepository.getAllByExchangeOfferIdOrderByDateAsc(offerId);
    }
}
