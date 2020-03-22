package com.chepiv.offersservice.repository;

import com.chepiv.offersservice.domain.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}
