package com.chepiv.offersservice.controllers;

import com.chepiv.offersservice.domain.Offer;
import com.chepiv.offersservice.dto.OfferDto;
import com.chepiv.offersservice.services.OfferCommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping
    ResponseEntity<Offer> createAnOffer(OfferDto offerDto) {
        return ResponseEntity.ok(offerCommonService.addAnOffer(offerDto));
    }

}
