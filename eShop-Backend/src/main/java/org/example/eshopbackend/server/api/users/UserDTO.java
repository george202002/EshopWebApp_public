package org.example.eshopbackend.server.api.users;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserDTO {
    private int id;
    private String name;
    private String surname;
    private String email;
    private Date dob;
    private String password;
    private boolean isAdmin;
}
