package com.chepiv.offersservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Offer {

    @Id
    private Long id;

    @Column
    private String description;

    @Column
    private String imageUrl;

    @Column(nullable = false)
    private Long accountId;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Game> games;
}
