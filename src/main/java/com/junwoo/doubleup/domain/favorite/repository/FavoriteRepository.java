package com.junwoo.doubleup.domain.favorite.repository;

import com.junwoo.doubleup.domain.favorite.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByMember_Id(Long memberId);

    boolean existsByMember_IdAndStock_StockId(Long memberId, Long stockId);

    void deleteByMember_IdAndStock_StockId(Long memberId, Long stockId);
}
