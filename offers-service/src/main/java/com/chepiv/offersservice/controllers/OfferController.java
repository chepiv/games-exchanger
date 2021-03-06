package com.chepiv.offersservice.controllers;

import com.chepiv.offersservice.domain.ExchangeOffer;
import com.chepiv.offersservice.domain.Offer;
import com.chepiv.offersservice.services.OfferCommonService;
import com.chepiv.offersservice.utils.AccountUtils;
import com.netflix.ribbon.proxy.annotation.Http;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @GetMapping(value = "/user-offers", produces = "application/json")
    ResponseEntity<List<Offer>> getUserOffers(OAuth2Authentication user) {
        return ResponseEntity.ok(offerCommonService.getUserOffers(user));
    }

    @PostMapping
    ResponseEntity createAnOffer(@RequestBody Offer offerDto, OAuth2Authentication user) {
        offerDto.setAccountId(AccountUtils.extractOauth2AccountId(user));
        offerDto.setAccountName(AccountUtils.extractLogin(user));
        try {
            return ResponseEntity.ok(offerCommonService.addAnOffer(offerDto));
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Offer> deleteOffer(@PathVariable("id") Long id) {
        offerCommonService.removeSourceOffer(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/exchangeOffer")
    ResponseEntity<ExchangeOffer> createExchangeOffer(@RequestBody ExchangeOffer exchangeOffer, OAuth2Authentication user) {
        exchangeOffer.setAccountId(AccountUtils.extractOauth2AccountId(user));
        exchangeOffer.setAccountName(AccountUtils.extractLogin(user));
        return ResponseEntity.ok(offerCommonService.addExchangeOffer(exchangeOffer, user));
    }

    @GetMapping("/exchangeOffer/{id}")
    ResponseEntity<ExchangeOffer> getExchangeOffer(@PathVariable("id") Long id) {
        return ResponseEntity.of(offerCommonService.getExchangeOffer(id));
    }

    @GetMapping("/receivedOffers")
    ResponseEntity<List<ExchangeOffer>> getReceivedOffers(OAuth2Authentication user) {
        return ResponseEntity.ok(offerCommonService.getReceivedOffers(AccountUtils.extractOauth2AccountId(user)));
    }

    @GetMapping("/sentOffers")
    ResponseEntity<List<ExchangeOffer>> getSentOffers(OAuth2Authentication user) {
        return ResponseEntity.ok(offerCommonService.getSentOffers(AccountUtils.extractOauth2AccountId(user)));
    }

    @PostMapping("/acceptOffer/{id}")
    ResponseEntity acceptOffer(@PathVariable("id") Long offerId,  OAuth2Authentication user) {
        boolean b = offerCommonService.acceptOffer(offerId, user);
        if (b) {
            return ResponseEntity.ok("Accepted");
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
    }

    @PostMapping("/declineOffer/{id}")
    ResponseEntity declineOffer(@PathVariable("id") Long offerId, OAuth2Authentication user) {
        boolean b = offerCommonService.declineExchangeOfferOffer(offerId,user);
        if (b) {
            return ResponseEntity.ok("Declined success");
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
    }

}
