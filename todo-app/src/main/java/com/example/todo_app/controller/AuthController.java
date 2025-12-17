
package com.example.todo_app.controller;

import com.example.todo_app.dto.LoginRequest;
import com.example.todo_app.entity.User;         
import com.example.todo_app.service.AuthService;   
import org.springframework.http.ResponseEntity;    
import org.springframework.web.bind.annotation.*; 
import java.util.Map; 
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        System.out.println("Register request received for email: " + user.getEmail());
        try {
            String token = authService.registerAndGetToken(user);
            System.out.println(" Registration successful, token generated");
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            System.out.println(" Registration failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

   @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        System.out.println("Login request received for email: " + request.getEmail());
        try {
            String token = authService.login(request.getEmail(), request.getPassword());
            System.out.println("Login successful");
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            System.out.println("Login failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

}
