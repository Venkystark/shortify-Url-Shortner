package com.vky.shortify.User;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vky.shortify.Config.JWTService;

import jakarta.servlet.http.HttpServletResponse;

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
    public HashMap<String,String> registerUser(@RequestBody UserEntity user) {

        System.out.println(user.getUsername()+ " " + user.getPassword()+" "+user.getName());

        HashMap<String,String> response = new HashMap<>();
        
        response.put("status", "success");

        System.out.println("User Registered: " + user.getUsername()+ " " + user.getPassword());

        try {
            UserEntity userEntity = userService.findByUsername(user.getUsername());

            if(userEntity != null) {
                response.put("status", "failed");
                response.put("message", "User already exists");

                return response;
            }

            userService.saveUser(user);

            response.put("message", "User registered successfully");

            return response;
            
        } catch (Exception e) {
            System.out.println("Error in user registration: "+e.getMessage());

            response.put("status", "failed");
            response.put("message", "Internal server error");
            return response;
        }
    
    }

    @GetMapping("t1")
    public String testEndpoint() {
        return "Test endpoint is working!";
    }

    @PostMapping("login")
    public HashMap<String,String> loginUser(@RequestBody UserEntity user) {
        System.out.println("User Logged In: " + user.getUsername()+ " " + user.getPassword());
        HashMap<String,String> response = new HashMap<>();
        response.put("status", "success");
        if(userService.verifyUser(user, authenticationManager))
            response.put("token", jwtService.generateToken(user.getUsername()));
        else
            response.put("status", "failed");
        // response.put("authenticated", Boolean.toString(userService.verifyUser(user, authenticationManager)));
        return response;
    }

//     @PostMapping("/login")
// public ResponseEntity<?> loginUser(@RequestBody UserEntity user, HttpServletResponse response) {
//     System.out.println("User Logged In: " + user.getUsername() + " " + user.getPassword());

//     if (userService.verifyUser(user, authenticationManager)) {
//         String token = jwtService.generateToken(user.getUsername());

//         // Create the cookie
//         ResponseCookie cookie = ResponseCookie.from("jwt", token)
//                 .httpOnly(true)
//                 .secure(false) 
//                 .path("/")
//                 .maxAge(24 * 60 * 60) 
//                 .sameSite("Strict")
//                 .build();

//         // Add cookie to response
//         response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

//         Map<String, String> body = new HashMap<>();
//         body.put("message", "Login successful");
//         return ResponseEntity.ok(body);
//     } else {
//         Map<String, String> body = new HashMap<>();
//         body.put("error", "Invalid credentials");
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(body);
//     }
// }

    
}
