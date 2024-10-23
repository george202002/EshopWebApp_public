package org.example.eshopbackend.server.api.admins;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDTO {
    private String name;
    private long totalOrders;

    public CustomerDTO(String name, long totalOrders) {
        this.name = name;
        this.totalOrders = totalOrders;
    }
}
