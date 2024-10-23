package org.example.eshopbackend.server.api.login;

import org.example.eshopbackend.database.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User newUser) {
        ResponseEntity<Map<String, String>> responseEntity;
        Map<String, String> response = new HashMap<>();
        try {
            String result = loginService.registerUser(newUser);
            response.put("status", result);
            responseEntity = status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("status", "ERROR");
            responseEntity = status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        return responseEntity;
    }

    @PostMapping("/auth")
    public ResponseEntity<User> login(@RequestParam String username, @RequestParam String password) {
        ResponseEntity<User> responseEntity;
        try {
            User user = loginService.login(username, password);
            if (user != null) {
                responseEntity = status(HttpStatus.OK).body(user);
            } else {
                responseEntity = status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } catch (Exception e) {
            responseEntity = status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return responseEntity;
    }
}
