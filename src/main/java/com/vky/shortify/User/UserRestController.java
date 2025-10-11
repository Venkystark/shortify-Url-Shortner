package com.vky.shortify.User;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vky.shortify.Config.JWTService;

@RestController
@RequestMapping("/")
public class UserRestController {

    @Autowired
    UserService userService;

    @Autowired
    JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("register")
    public UserEntity registerUser(@RequestBody UserEntity user) {

        System.out.println("User Registered: " + user.getUsername()+ " " + user.getPassword());

        return userService.saveUser(user);
    }

    @PostMapping("login")
    public HashMap<String,String> loginUser(@RequestBody UserEntity user) {
        System.out.println("User Logged In: " + user.getUsername()+ " " + user.getPassword());
        HashMap<String,String> response = new HashMap<>();
        if(userService.verifyUser(user, authenticationManager))
            response.put("token", jwtService.generateToken(user.getUsername()));
        else
            response.put("token", "Invalid Credentials");
        // response.put("authenticated", Boolean.toString(userService.verifyUser(user, authenticationManager)));
        return response;
    }
    
}
