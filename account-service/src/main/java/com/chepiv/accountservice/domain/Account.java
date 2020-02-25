package com.chepiv.accountservice.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

/**
 * Created by chepiv on 04/01/2020.
 * Contact: chepurin.ivan@gmail.com
 * Github:chepiv
 */
@Entity
@Data
@NoArgsConstructor
public class Account {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

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

    @Column
    private String imageUrl;

    @ManyToOne
    private Country country;

    @ManyToOne
    private City city;


}
