package com.chepiv.offersservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameAccount {

    @EmbeddedId
    private GameAccountPK id;

    @ManyToOne
    @MapsId("gameId")
    private Game game;

    public GameAccount(GameAccountPK id) {
        this.id = id;
    }
}

