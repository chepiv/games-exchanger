package com.chepiv.offersservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String shortDescription;

    @Column
    private String longDescription;

    @Column(precision = 1, scale = 1)
    private Double ranking;

    @Column
    private String coverUrl;

    @ManyToOne
    private Platform platform;

    @JsonIgnore
    @ManyToMany(mappedBy = "games")
    private List<Offer> offers;

    @JsonIgnore
    @ManyToMany(mappedBy = "offeredGames")
    private List<ExchangeOffer> exchangeOffers;

}
