package org.example.eshopbackend.server.api.items;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDTO {
    private int id;
    private String name;
    private String description;
    private float price;
    private int quantity;
    private String image;
}

