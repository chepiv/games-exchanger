package com.chepiv.chatservice.repository;

import com.chepiv.chatservice.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> getAllByExchangeOfferIdOrderByDateAsc(Long exchangeOfferId);
}
