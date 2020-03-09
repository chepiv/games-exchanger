package com.chepiv.accountservice.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by chepiv on 06/03/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@Entity
@Data
@NoArgsConstructor
public class AccountGame {

    @EmbeddedId
    private AccountGamePK id;

    @ManyToOne
    @MapsId("accountId")
    private Account account;


}

@Embeddable
@Data
@NoArgsConstructor
class AccountGamePK implements Serializable {
    @Column(name = "account_id")
    public Long accountId;
    @Column(name = "game_id")
    public Long gameId;
}
