package com.junwoo.doubleup.domain.favorite.dto;

import com.junwoo.doubleup.domain.favorite.entity.Favorite;
import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class FavoriteMapperImpl implements FavoriteMapper {

    @Override
    public Favorite toEntity(Member member, Stock stock) {
        if ( member == null && stock == null ) {
            return null;
        }

        Favorite.FavoriteBuilder favorite = Favorite.builder();

        favorite.member( member );
        favorite.stock( stock );

        return favorite.build();
    }
}
