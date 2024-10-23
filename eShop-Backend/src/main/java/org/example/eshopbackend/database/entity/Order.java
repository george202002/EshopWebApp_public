package org.example.eshopbackend.database.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "order", schema = "public")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;
    @Column(name="user_id", nullable = false)
    private Long userId;
    @Column(name="datetime", nullable = false)
    private LocalDateTime datetime;

    public Order() {
    }

    public Order(Long userId, LocalDateTime datetime) {
        this.userId = userId;
        this.datetime = datetime;
    }
}
