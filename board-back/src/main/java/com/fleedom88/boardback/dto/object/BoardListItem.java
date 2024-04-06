package com.fleedom88.boardback.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardListItem {
    private int boardNumner;
    private String title;
    private String content;
    private String boardTitleImage;
    private int favoriteCount;
    private String commentCount;
    private String writeDatetime;
    private String writerNickname;
    private String writerProfileImage;
}