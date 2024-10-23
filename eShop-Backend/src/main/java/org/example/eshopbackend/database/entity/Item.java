package org.example.eshopbackend.database.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "item", schema = "public")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;
    @Column(name="name", nullable = false)
    private String name;
    @Column(name="description", nullable = true)
    private String description;
    @Column(name="price", nullable = false)
    private double price;
    @Column(name="quantity", nullable = false)
    private int quantity;
    @Column(name="image", nullable = false)
    private String image;

    public Item() {
    }

    public Item(String name, String description, double price, int quantity, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }
}
