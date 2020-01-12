package com.chepiv.accountservice.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Created by chepiv on 04/01/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@Entity
@Data
@NoArgsConstructor
public class City {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
}
