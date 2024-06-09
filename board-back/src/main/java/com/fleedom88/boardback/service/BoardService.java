package com.fleedom88.boardback.service;

import org.springframework.http.ResponseEntity;

import com.fleedom88.boardback.dto.request.board.PostBoardRequestDto;
import com.fleedom88.boardback.dto.request.board.PostCommentRequestDto;
import com.fleedom88.boardback.dto.response.board.GetBoardResponseDto;
import com.fleedom88.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.fleedom88.boardback.dto.response.board.PostBoardReponseDto;
import com.fleedom88.boardback.dto.response.board.PostCommentResponseDto;
import com.fleedom88.boardback.dto.response.board.PutFavoriteResponseDto;
import com.fleedom88.boardback.dto.response.board.IncreaseViewCountResponseDto;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getCommentList(Integer boardNumber);

    ResponseEntity<? super PostBoardReponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PostCommentResponseDto> PostComment(PostCommentRequestDto dto, Integer boardNumber ,String email);

    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) ;

    ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);
}
