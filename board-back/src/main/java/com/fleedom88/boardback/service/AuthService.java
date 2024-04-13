package com.fleedom88.boardback.service;

import org.springframework.http.ResponseEntity;

import com.fleedom88.boardback.dto.request.auth.SignUpRequestDto;
import com.fleedom88.boardback.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

}
