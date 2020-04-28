package com.chepiv.offersservice.services;

import com.chepiv.offersservice.client.StorageClient;
import com.chepiv.offersservice.domain.ExchangeOffer;
import com.chepiv.offersservice.domain.Game;
import com.chepiv.offersservice.domain.Offer;
import com.chepiv.offersservice.dto.OfferDto;
import com.chepiv.offersservice.repository.ExchangeOfferRepository;
import com.chepiv.offersservice.repository.GameRepository;
import com.chepiv.offersservice.repository.OfferRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class OfferCommonService {

    private final OfferRepository offerRepository;
    private final GameRepository gameRepository;
    private final ExchangeOfferRepository exchangeOfferRepository;
    private final StorageClient storageClient;

    @Autowired
    public OfferCommonService(OfferRepository offerRepository, GameRepository gameRepository, ExchangeOfferRepository exchangeOfferRepository, StorageClient storageClient) {
        this.offerRepository = offerRepository;
        this.gameRepository = gameRepository;
        this.exchangeOfferRepository = exchangeOfferRepository;
        this.storageClient = storageClient;
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Optional<Offer> getOffer(Long id) {
        return offerRepository.findById(id);
    }
    
    public Offer addAnOffer(Offer offerDto) {
        if (Objects.isNull(offerDto.getImageUrl())) {
            offerDto.setImageUrl(offerDto.getGames().stream().map(Game::getCoverUrl).findFirst().orElse(""));
        } else {
//            storageClient.uploadFile() TODO: create an offer as account with file
        }
        return offerRepository.save(offerDto);
    }

    public ExchangeOffer addExchangeOffer(ExchangeOffer exchangeOffer) {
        return exchangeOfferRepository.save(exchangeOffer);
    }


    private Offer map(OfferDto offerDto) {
        Offer offer = new Offer();
        offer.setAccountId(offerDto.getAccountId());
        offer.setDescription(offerDto.getDescription());
        offer.setImageUrl(offerDto.getImageUrl());
        offer.setGames(gameRepository.findAllById(offerDto.getGames()));
        return offer;
    }

}
