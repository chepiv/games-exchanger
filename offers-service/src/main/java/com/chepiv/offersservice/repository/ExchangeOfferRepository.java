package com.chepiv.offersservice.repository;

import com.chepiv.offersservice.domain.ExchangeOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExchangeOfferRepository extends JpaRepository<ExchangeOffer, Long> {

    @Query("SELECT eo from ExchangeOffer eo WHERE eo.sourceOffer.accountId = :accountId AND eo.accepted is null")
    List<ExchangeOffer> findAllReceivedOffers(@Param("accountId") Long accountId);
}
