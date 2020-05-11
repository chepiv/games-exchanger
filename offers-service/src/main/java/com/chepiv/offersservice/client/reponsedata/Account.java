package com.chepiv.offersservice.client.reponsedata;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Created by chepiv on 04/01/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@Data
@NoArgsConstructor
public class Account {

    private Long id;

    private String login;

    private String password;

    private String email;

    private String name;

    private String surname;

    private String imageUrl;

    private Country country;

    private City city;


}

