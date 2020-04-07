package com.chepiv.offersservice.services;

import com.chepiv.offersservice.domain.Offer;
import com.chepiv.offersservice.dto.OfferDto;
import com.chepiv.offersservice.repository.GameRepository;
import com.chepiv.offersservice.repository.OfferRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class OfferCommonService {

    private final OfferRepository offerRepository;
    private final GameRepository gameRepository;

    @Autowired
    public OfferCommonService(OfferRepository offerRepository, GameRepository gameRepository) {
        this.offerRepository = offerRepository;
        this.gameRepository = gameRepository;
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Offer addAnOffer(OfferDto offerDto) {
        return offerRepository.save(map(offerDto));
    }

    public Offer addAnOffer(Offer offerDto) {
        return offerRepository.save(offerDto);
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
