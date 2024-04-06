package com.fleedom88.boardback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings (CorsRegistry CorsRegistry){
        CorsRegistry
        .addMapping("/**")
        .allowedMethods("*")
        .allowedOrigins("*");
        
    }
}
