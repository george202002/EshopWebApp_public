package org.example.eshopbackend.server.api.orders;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDTO {
    private Long itemId;
    private String itemName;
    private int quantity;
    private double price;
}
