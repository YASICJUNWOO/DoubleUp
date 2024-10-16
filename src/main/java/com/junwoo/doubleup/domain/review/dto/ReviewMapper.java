package com.junwoo.doubleup.domain.review.dto;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.review.entity.Review;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReviewMapper {

    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    Review toEntity(Member member, Stock stock, ReviewRequest reviewRequest);

}
