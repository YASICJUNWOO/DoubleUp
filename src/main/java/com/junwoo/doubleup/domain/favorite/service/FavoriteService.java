package com.junwoo.doubleup.domain.favorite.service;

import com.junwoo.doubleup.domain.favorite.entity.Favorite;
import com.junwoo.doubleup.domain.favorite.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    @Transactional
    public void saveFavorite(Favorite favorite) {
        favoriteRepository.save(favorite);
    }

    @Transactional
    public void deleteFavorite(Long stockId, Long memberId) {
        favoriteRepository.deleteByMember_IdAndStock_StockId(memberId, stockId);
    }

}
