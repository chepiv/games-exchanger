package com.chepiv.offersservice.repository;

import com.chepiv.offersservice.domain.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findAllByAccountIdAndActiveIsTrue(Long accountId);
}
