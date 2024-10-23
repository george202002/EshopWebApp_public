package org.example.eshopbackend.database.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "user", schema = "public")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;
    @Column(name="name", nullable = false)
    private String name;
    @Column(name="surname", nullable = false)
    private String surname;
    @Column(name="email", nullable = false)
    private String email;
    @Column(name="dob", nullable = false)
    private Date dob;
    @Column(name="password", nullable = false)
    private String password;
    @Column(name="username", nullable = false, unique = true)
    private String username;
    @Column(name="isadmin", nullable = false, unique = true)
    private boolean isAdmin;

    public User() {
    }

    public User(String name, String surname, String email, Date dob, String password, String username, boolean isAdmin) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.dob = dob;
        this.password = password;
        this.username = username;
        this.isAdmin = isAdmin;
    }

}
