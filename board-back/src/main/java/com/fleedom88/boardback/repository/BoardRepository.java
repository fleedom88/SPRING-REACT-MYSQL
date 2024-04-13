package com.fleedom88.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fleedom88.boardback.entity.BoardEntity;

public interface BoardRepository extends JpaRepository<BoardEntity,String>{
    
}
