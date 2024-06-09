package com.fleedom88.boardback.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fleedom88.boardback.common.ResponseCode;
import com.fleedom88.boardback.common.ResponseMessage;
import com.fleedom88.boardback.dto.object.CommentListItem;
import com.fleedom88.boardback.dto.response.ResponseDto;
import com.fleedom88.boardback.repository.resultSet.GetCommentListResultSet;

import lombok.Getter;

@Getter
public class GetCommentResponseDto extends ResponseDto {

    private List<CommentListItem> favoriteList;

    private GetCommentResponseDto(List<GetCommentListResultSet> resultSets ) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.favoriteList = CommentListItem.copyList(resultSets);
    }

    public static ResponseEntity<GetCommentResponseDto> succcess(List<GetCommentListResultSet> resultSets) {
        GetCommentResponseDto result = new GetCommentResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
    
}
