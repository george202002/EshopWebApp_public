package org.example.eshopbackend.server.api.orders;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private Long orderId;
    private Long userId;
    private List<OrderItemDTO> items;
    private double totalOrderCost;
    private LocalDateTime orderDate;
}
