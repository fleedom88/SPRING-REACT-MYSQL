package com.fleedom88.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fleedom88.boardback.dto.response.ResponseDto;
import com.fleedom88.boardback.dto.response.user.GetSignInUserResponseDto;
import com.fleedom88.boardback.entity.UserEntity;
import com.fleedom88.boardback.repository.UserRepository;
import com.fleedom88.boardback.dto.response.user.GetUserResponseDto;
import com.fleedom88.boardback.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement  implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String email) {
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return GetUserResponseDto.noExistUser();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetUserResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
        
        UserEntity userEntity = new UserEntity();

        try {

            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return GetSignInUserResponseDto.notExistedUser();
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(userEntity);

    }
    
}
