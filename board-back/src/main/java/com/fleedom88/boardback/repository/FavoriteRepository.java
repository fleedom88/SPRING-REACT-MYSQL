package com.fleedom88.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fleedom88.boardback.entity.FavoriteEntity;
import com.fleedom88.boardback.entity.primaryKey.FavoritePk;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {
    
    FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);

}
