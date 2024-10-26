package com.junwoo.doubleup.domain.favorite.dto;

import com.junwoo.doubleup.domain.favorite.entity.Favorite;
import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FavoriteMapper {

    FavoriteMapper INSTANCE = Mappers.getMapper(FavoriteMapper.class);

    Favorite toEntity(Member member, Stock stock);
}
