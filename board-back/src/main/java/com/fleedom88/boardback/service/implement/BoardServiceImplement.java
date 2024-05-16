package com.fleedom88.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fleedom88.boardback.dto.request.board.PostBoardRequestDto;
import com.fleedom88.boardback.dto.response.ResponseDto;
import com.fleedom88.boardback.dto.response.board.PostBoardReponseDto;
import com.fleedom88.boardback.entity.BoardEntity;
import com.fleedom88.boardback.repository.BoardRepository;
import com.fleedom88.boardback.repository.UserRepository;
import com.fleedom88.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Override
    public ResponseEntity<? super PostBoardReponseDto> postBoard(PostBoardRequestDto dto, String email) {
     
        try {

            boolean existedEmail = userRepository.existsByEmail(email);
            if (!existedEmail) return PostBoardReponseDto.notExistedUser(); 

            BoardEntity boardEntity = new BoardEntity();
            boardRepository.save(boardEntity);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardReponseDto.success();

    }
    
}
