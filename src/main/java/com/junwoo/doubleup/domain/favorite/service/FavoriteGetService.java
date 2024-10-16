package com.junwoo.doubleup.domain.favorite.service;

import com.junwoo.doubleup.domain.favorite.entity.Favorite;
import com.junwoo.doubleup.domain.favorite.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteGetService {

    private final FavoriteRepository favoriteRepository;

    @Transactional(readOnly = true)
    public boolean isFavorite(Long memberId, Long stockId) {
        return favoriteRepository.existsByMember_IdAndStock_StockId(memberId, stockId);
    }

    @Transactional(readOnly = true)
    public List<Favorite> getFavoriteListByUserId(Long memberId) {
        return favoriteRepository.findByMember_Id(memberId);
    }
}
