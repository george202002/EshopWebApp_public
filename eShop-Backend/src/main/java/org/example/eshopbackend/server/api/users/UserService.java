package org.example.eshopbackend.server.api.users;

import org.example.eshopbackend.database.entity.User;
import org.example.eshopbackend.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.Optional;


@Service("userService")
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    public Boolean saveAccountInfo(String username, String name, String surname, String email, String dob) {
        try {
            User existingUser = userRepository.findByUsername(username);

            if (existingUser != null) {
                existingUser.setName(name);
                existingUser.setSurname(surname);
                existingUser.setEmail(email);

                SimpleDateFormat inputDateFormat = new SimpleDateFormat("dd/MM/yyyy");
                Date parsedDob = inputDateFormat.parse(dob);

                SimpleDateFormat sqlDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String sqlFormattedDob = sqlDateFormat.format(parsedDob);

                existingUser.setDob(java.sql.Date.valueOf(sqlFormattedDob));

                userRepository.save(existingUser);
                return true;
            }else return false;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
