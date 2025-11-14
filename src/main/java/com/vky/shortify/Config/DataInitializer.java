package com.vky.shortify.Config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.vky.shortify.User.UserEntity;
import com.vky.shortify.User.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Configuration
public class DataInitializer {

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);


    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) { // only if no users exist
                UserEntity user = new UserEntity();
                user.setUsername("publicuser@vky.com");
                user.setName("Public User");
                user.setPassword(passwordEncoder.encode("Pass@123"));

                userRepository.save(user);
                System.out.println("✅ Dummy user created: dummy@example.com / password123");
            } else {
                System.out.println("ℹ️ Users already exist, skipping dummy user creation.");
            }
        };
    }
}
