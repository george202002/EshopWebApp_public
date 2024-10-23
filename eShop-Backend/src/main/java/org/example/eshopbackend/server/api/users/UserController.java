package org.example.eshopbackend.server.api.users;

import org.example.eshopbackend.database.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/account")
    public ResponseEntity<User> getAccountInfo(@RequestParam Long id){
        ResponseEntity<User> responseEntity;
        try {
            User response = userService.getUser(id);
            responseEntity = status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            responseEntity = status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return responseEntity;
    }

    @PostMapping("/account/save")
    public ResponseEntity<Boolean> saveAccountInfo(@RequestParam String username, @RequestParam String name, @RequestParam String surname, @RequestParam String email, @RequestParam String dob){
        ResponseEntity<Boolean> responseEntity;
        try {
            Boolean response = userService.saveAccountInfo(username, name, surname, email, dob);
            responseEntity = status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            responseEntity = status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return responseEntity;
    }
}
