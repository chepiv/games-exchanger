package com.chepiv.offersservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class GameAccountPK implements Serializable {
    @Column(name = "game_id")
    public Long gameId;
    @Column(name = "account_id")
    public Long accountId;
}
