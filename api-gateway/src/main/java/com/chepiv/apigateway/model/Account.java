package com.chepiv.apigateway.model;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by chepiv on 05/01/2020.
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

    private String country;

    private String city;
}
