package com.example.todo_app.service;

import com.example.todo_app.entity.User;
import com.example.todo_app.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder(); 
    }

    public String login(String email, String rawPassword) {
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtUtil.generateToken(String.valueOf(user.getId()));
    }

    public String registerAndGetToken(User user) {
        User savedUser = register(user);
        return jwtUtil.generateToken(String.valueOf(savedUser.getId()));
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // hash du password
        return userService.save(user);
    }
}
