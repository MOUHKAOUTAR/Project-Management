package com.example.todo_app.security;

import com.example.todo_app.entity.User;
import com.example.todo_app.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.util.List;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        System.out.println(" JwtFilter - Request URI: " + request.getRequestURI());
        System.out.println(" JwtFilter - Authorization header: " + (authHeader != null ? "Present" : "Missing"));

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                System.out.println(" JwtFilter - Token extracted, length: " + token.length());
                
            
                if (jwtUtil.isTokenValid(token)) {
                    String subject = jwtUtil.extractSubject(token);
                    System.out.println(" JwtFilter - Token is valid, subject: " + subject);

                    if (subject != null && !subject.isEmpty()) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(subject, null, Collections.emptyList());

                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        System.out.println("JwtFilter - Authentication set in SecurityContext");
                    } else {
                        System.out.println(" JwtFilter - Subject is null or empty");
                    }
                } else {
                    System.out.println(" JwtFilter - Token is expired or invalid");
                }
            } catch (Exception e) {
                System.out.println(" JwtFilter - Token validation failed: " + e.getMessage());
                e.printStackTrace();
            }
        } else {
            System.out.println(" JwtFilter - No Authorization header or not Bearer token");
        }

        // Vérifier l'état de l'authentification avant de continuer
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            System.out.println("JwtFilter - Authentication present: " + 
                SecurityContextHolder.getContext().getAuthentication().getName());
        } else {
            System.out.println(" JwtFilter - No authentication in SecurityContext");
        }

        filterChain.doFilter(request, response);
    }
}
