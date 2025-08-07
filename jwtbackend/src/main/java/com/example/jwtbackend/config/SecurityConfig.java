package com.example.jwtbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf().disable()
            .authorizeHttpRequests()
                .requestMatchers(
                    "/", 
                    "/index.html", 
                    "/static/**", 
                    "/js/**", 
                    "/css/**", 
                    "/images/**", 
                    "/favicon.ico",
                    "/api/auth/register", 
                    "/api/auth/login"
                ).permitAll()
                .anyRequest().authenticated()
            .and()
            .headers()
                .frameOptions().sameOrigin();

        return http.build();
    }



    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // tüm endpointler için
                        .allowedOrigins("http://localhost:3000")  // izin verilen frontend adresi
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // izin verilen HTTP metodları
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
