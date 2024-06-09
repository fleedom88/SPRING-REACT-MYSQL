package com.fleedom88.boardback.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.fleedom88.boardback.repository.resultSet.GetCommentListResultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentListItem {
    private String nickname;
    private String profileImage;
    private String writeDatetime;
    private String content;

    public CommentListItem(GetCommentListResultSet resultSet){
        this.profileImage = resultSet.getNickname();
        this.writeDatetime = resultSet.getProfileIamge();
        this.nickname = resultSet.getWriteDatetime();
        this.content = resultSet.getProfileIamge();
    }

    public static List<CommentListItem> copyList(List<GetCommentListResultSet> resultSets) {
        List<CommentListItem> list = new ArrayList<>();
        for(GetCommentListResultSet resultSet: resultSets) {
            CommentListItem commentListitem = new CommentListItem(resultSet);
            list.add(commentListitem);           
        }
        return list;
    }

}
