package com.fleedom88.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fleedom88.boardback.entity.CommentEntity;
                                                                        //PK 타입
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    
}
