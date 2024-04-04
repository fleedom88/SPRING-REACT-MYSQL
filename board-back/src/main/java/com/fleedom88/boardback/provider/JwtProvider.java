package com.fleedom88.boardback.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtProvider {
    
    private String secretKey = "SecretK3y";

    // JWT 만들기
    public String create(String email){

        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        String jwt = Jwts.builder()
            .signWith(SignatureAlgorithm.ES256, secretKey)
            .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
            .compact();

            return jwt;
    }

    //JWT 검증
    public String validate(String jwt){

        Claims claims = null;
        try {
            claims = Jwts.parser().setSigningKey(secretKey)
            .parseClaimsJws(jwt).getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return claims.getSubject();
    }

    
}
