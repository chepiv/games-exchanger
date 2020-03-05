package com.chepiv.offersservice.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
public class GameAccount {

    @EmbeddedId
    private GameAccountPK id;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;


}

@Embeddable
@Data
@NoArgsConstructor
class GameAccountPK implements Serializable {
    public Long gameId;
    public Long accountId;
}
