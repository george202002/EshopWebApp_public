package org.example.eshopbackend.server.api.login;

import org.example.eshopbackend.database.entity.User;
import org.example.eshopbackend.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("loginService")
public class LoginService {
    @Autowired
    private UserRepository userRepository;

    public String registerUser(User newUser) {
        if (userRepository.findByUsername(newUser.getUsername()) == null) {
            String hashedPassword = PasswordUtils.hashPassword(newUser.getPassword());
            newUser.setPassword(hashedPassword); //hash password

            if (newUser.getEmail().contains("@admin.com")) { //set admin
                newUser.setAdmin(true);
            } else {
                newUser.setAdmin(false);
            }
            userRepository.save(newUser);
            return "SUCCESS";
        }
        return "FAILED";
    }

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && PasswordUtils.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }
}
