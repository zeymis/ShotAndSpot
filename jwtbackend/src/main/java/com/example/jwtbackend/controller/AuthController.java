package com.example.jwtbackend.controller;

import com.example.jwtbackend.model.User;
import com.example.jwtbackend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final String secretKey = "mysecretkey123456"; // bunu gerçek projede güvenli sakla!

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        String password = userData.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            // Token üret
            String token = Jwts.builder()
                    .setSubject(email)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000)) // 1 saat geçerli
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();

            return Collections.singletonMap("token", token);
        }

        return Collections.singletonMap("error", "Login Failed");
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        String password = userData.get("password");

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return Collections.singletonMap("error", "Email already in use");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(password); // Gerçek projede şifreyi hash'le!
        userRepository.save(user);

        return Collections.singletonMap("message", "Registration successful");
    }

    @GetMapping("/all-users")
        public List<User> getAllUsers() {
            return userRepository.findAll();
    }

}
