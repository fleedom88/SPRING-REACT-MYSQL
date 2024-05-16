package com.fleedom88.boardback.service;

import org.springframework.http.ResponseEntity;

import com.fleedom88.boardback.dto.request.board.PostBoardRequestDto;
import com.fleedom88.boardback.dto.response.board.PostBoardReponseDto;

public interface BoardService {
    ResponseEntity<? super PostBoardReponseDto> postBoard(PostBoardRequestDto dto, String email);
}
