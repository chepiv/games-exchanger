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
public class Account {

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String login;

    @Column
    private String password;

    @Column(unique = true)
    private String email;

    @Column
    private String name;

    @Column
    private String surname;

    @ManyToOne
    private Country country;

    @ManyToOne
    private City city;


}
