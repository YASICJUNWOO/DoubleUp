package com.junwoo.doubleup.domain.favorite.controller;

import com.junwoo.doubleup.domain.favorite.dto.FavoriteMapper;
import com.junwoo.doubleup.domain.favorite.dto.FavoriteRequest;
import com.junwoo.doubleup.domain.favorite.entity.Favorite;
import com.junwoo.doubleup.domain.favorite.service.FavoriteGetService;
import com.junwoo.doubleup.domain.favorite.service.FavoriteService;
import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.service.StockGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final FavoriteGetService favoriteGetService;
    private final MemberGetService memberGetService;
    private final StockGetService stockGetService;

    private final FavoriteMapper favoriteMapper = FavoriteMapper.INSTANCE;

    @GetMapping
    public boolean isFavorite(@RequestParam Long memberId, @RequestParam Long stockId) {
        return favoriteGetService.isFavorite(memberId, stockId);
    }

    @GetMapping("/stocks")
    public List<Stock> getFavoriteStocks(@RequestParam(name = "memberId") Long memberId) {
        List<Favorite> favoriteListByUserId = favoriteGetService.getFavoriteListByUserId(memberId);
        return favoriteListByUserId.stream()
                .map(Favorite::getStock)
                .toList();
    }

    @PostMapping
    public void saveFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        Member member = memberGetService.findById(favoriteRequest.memberId());
        Stock stock = stockGetService.findById(favoriteRequest.stockId());
        favoriteService.saveFavorite(favoriteMapper.toEntity(member, stock));
    }

    @DeleteMapping
    public void deleteFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        favoriteService.deleteFavorite(favoriteRequest.stockId(), favoriteRequest.memberId());
    }

}
