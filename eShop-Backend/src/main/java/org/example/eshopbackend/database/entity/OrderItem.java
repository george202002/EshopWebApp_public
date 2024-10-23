package org.example.eshopbackend.database.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "order_item", schema = "public")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;
    @Column(name="order_id", nullable = false)
    private Long orderId;
    @Column(name="item_id", nullable = false)
    private Long itemId;
    @Column(name="quantity", nullable = false)
    private int quantity;

    public OrderItem() {
    }

    public OrderItem(Long orderId, Long itemId, int quantity) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.quantity = quantity;
    }
}
