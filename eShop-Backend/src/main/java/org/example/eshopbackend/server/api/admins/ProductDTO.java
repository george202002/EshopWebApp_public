package org.example.eshopbackend.server.api.admins;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private String name;
    private int quantity;

    public ProductDTO(String name, int quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}
