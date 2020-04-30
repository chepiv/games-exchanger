package com.chepiv.offersservice.controllers;

import com.chepiv.offersservice.domain.ExchangeOffer;
import com.chepiv.offersservice.domain.Offer;
import com.chepiv.offersservice.services.OfferCommonService;
import com.chepiv.offersservice.utils.AccountUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("offers")
public class OfferController {

    private final OfferCommonService offerCommonService;

    @Autowired
    public OfferController(OfferCommonService offerCommonService) {
        this.offerCommonService = offerCommonService;
    }

    @GetMapping
    ResponseEntity<List<Offer>> getAll() {
        return new ResponseEntity<>(offerCommonService.getAllOffers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<Offer> getOffer(@PathVariable("id") Long id) {
        return ResponseEntity.of(offerCommonService.getOffer(id));
    }

    @PostMapping
    ResponseEntity<Offer> createAnOffer(@RequestBody Offer offerDto, OAuth2Authentication user) {
        offerDto.setAccountId(AccountUtils.extractOauth2AccountId(user));
        offerDto.setAccountName(AccountUtils.extractLogin(user));
        return ResponseEntity.ok(offerCommonService.addAnOffer(offerDto));
    }

    @PostMapping("/exchangeOffer")
    ResponseEntity<ExchangeOffer> createExchangeOffer(@RequestBody ExchangeOffer exchangeOffer, OAuth2Authentication user) {
        exchangeOffer.setAccountId(AccountUtils.extractOauth2AccountId(user));
        return ResponseEntity.ok(offerCommonService.addExchangeOffer(exchangeOffer));
    }

}
