package com.junwoo.doubleup.domain.favorite.controller;

import com.junwoo.doubleup.domain.favorite.dto.FavoriteMapper;
import com.junwoo.doubleup.domain.favorite.dto.FavoriteRequest;
import com.junwoo.doubleup.domain.favorite.service.FavoriteGetService;
import com.junwoo.doubleup.domain.favorite.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final FavoriteGetService favoriteGetService;

    private final FavoriteMapper favoriteMapper = FavoriteMapper.INSTANCE;

    @GetMapping
    public boolean isFavorite(@RequestParam Long memberId, @RequestParam Long stockId) {
        return favoriteGetService.isFavorite(memberId, stockId);
    }

    @PostMapping
    public void saveFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        favoriteService.saveFavorite(favoriteMapper.toEntity(favoriteRequest));
    }

    @DeleteMapping
    public void deleteFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        favoriteService.deleteFavorite(favoriteRequest.stockId(), favoriteRequest.memberId());
    }

}
