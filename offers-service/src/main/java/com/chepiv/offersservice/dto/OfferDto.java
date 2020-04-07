package com.chepiv.offersservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OfferDto {

    private Long id;

    private String description;

    private String imageUrl;

    private String title;

    private Long accountId;

    private List<Long> games;

}
