package com.chepiv.offersservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    public Offer sourceOffer;

    @ManyToMany(cascade = CascadeType.MERGE)
    public List<Game> offeredGames;

    @Column
    public Long accountId;

    @Column
    public String accountName;

    @Column
    public Date date;

    @Column
    public String commentary;

    @Column
    public Boolean accepted;


}
