package com.palakmistandbhandar.controller;

import com.palakmistandbhandar.dto.AuthRequest;
import com.palakmistandbhandar.dto.AuthResponse;
import com.palakmistandbhandar.model.AppUser;
import com.palakmistandbhandar.repository.AppUserRepository;
import com.palakmistandbhandar.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AppUserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            AppUser user = (AppUser) authentication.getPrincipal();
            String token = jwtUtil.generateToken(user);

            return ResponseEntity.ok(AuthResponse.builder()
                    .token(token)
                    .username(user.getUsername())
                    .role(user.getRole())
                    .fullName(user.getFullName())
                    .message("Login successful")
                    .build());

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponse.builder().message("Invalid username or password").build());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        AppUser user = (AppUser) authentication.getPrincipal();
        return ResponseEntity.ok(AuthResponse.builder()
                .username(user.getUsername())
                .role(user.getRole())
                .fullName(user.getFullName())
                .message("Authenticated")
                .build());
    }
}
