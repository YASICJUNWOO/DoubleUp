package com.junwoo.doubleup.domain.favorite.dto;

import com.junwoo.doubleup.domain.favorite.entity.Favorite;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FavoriteMapper {

    FavoriteMapper INSTANCE = Mappers.getMapper(FavoriteMapper.class);

    Favorite toEntity(FavoriteRequest favoriteRequest);
}
