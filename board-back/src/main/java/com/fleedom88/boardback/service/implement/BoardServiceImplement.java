package com.fleedom88.boardback.service.implement;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fleedom88.boardback.dto.request.board.PostBoardRequestDto;
import com.fleedom88.boardback.dto.request.board.PostCommentRequestDto;
import com.fleedom88.boardback.dto.response.ResponseDto;
import com.fleedom88.boardback.dto.response.board.GetBoardResponseDto;
import com.fleedom88.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.fleedom88.boardback.dto.response.board.PostBoardReponseDto;
import com.fleedom88.boardback.dto.response.board.PostCommentResponseDto;
import com.fleedom88.boardback.dto.response.board.PutFavoriteResponseDto;
import com.fleedom88.boardback.entity.BoardEntity;
import com.fleedom88.boardback.entity.CommentEntity;
import com.fleedom88.boardback.entity.FavoriteEntity;
import com.fleedom88.boardback.entity.ImageEntity;
import com.fleedom88.boardback.repository.BoardRepository;
import com.fleedom88.boardback.repository.CommentRepository;
import com.fleedom88.boardback.repository.FavoriteRepository;
import com.fleedom88.boardback.repository.ImageRepository;
import com.fleedom88.boardback.repository.UserRepository;
import com.fleedom88.boardback.repository.resultSet.GetBoardResultSet;
import com.fleedom88.boardback.repository.resultSet.GetFavoriteListResultSet;
import com.fleedom88.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final CommentRepository commentRepository;
    private final FavoriteRepository favoriteRepository;

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();

        try {

            resultSet = boardRepository.getBoard(boardNumber);
            if (resultSet == null) return GetBoardResponseDto.notExistBoard();
            
            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetBoardResponseDto.success(resultSet, imageEntities);
    }

    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {
        
        List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

        try {

            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if(!existedBoard) return GetFavoriteListResponseDto.noExistBoard();

            resultSets = favoriteRepository.getFavoriteList(boardNumber);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetFavoriteListResponseDto.succcess(resultSets);

    }


    @Override
    public ResponseEntity<? super PostBoardReponseDto> postBoard(PostBoardRequestDto dto, String email) {
     
        try {

            boolean existedEmail = userRepository.existsByEmail(email);
            if (!existedEmail) return PostBoardReponseDto.notExistedUser(); 

            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for (String image: boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }
            imageRepository.saveAll(imageEntities);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardReponseDto.success();

    }

    @Override
    public ResponseEntity<? super PostCommentResponseDto> PostComment(PostCommentRequestDto dto, Integer BoardNumber  , String email) {
        
        try {
            
            BoardEntity boardEntity = boardRepository.findByBoardNumber(BoardNumber);
            if(boardEntity == null) return PostCommentResponseDto.noExistBoard();

            boolean exsitedUser = userRepository.existsByEmail(email);
            if(!exsitedUser) return PostCommentResponseDto.noExistUser();

            CommentEntity commentEntity = new CommentEntity(dto, BoardNumber, email);
            commentRepository.save(commentEntity);

            boardEntity.increaseCommentCount();
            boardRepository.save(boardEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostCommentResponseDto.success();
    }

    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {
        
        try {

            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser) return PutFavoriteResponseDto.noExistedUser();

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
            if(favoriteEntity == null){
                favoriteEntity = new FavoriteEntity(email, boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaseFavoriteCount();
            }
            else{
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaseFavoriteCount();
            }
            
            boardRepository.save(boardEntity);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PutFavoriteResponseDto.success();

    }

   
}
