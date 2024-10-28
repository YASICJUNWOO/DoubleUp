package com.junwoo.doubleup.outapi.tossapi;

import com.junwoo.doubleup.domain.stocknews.entity.News;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TossApiMapper {

    TossApiMapper INSTANCE = Mappers.getMapper(TossApiMapper.class);

    // expression을 사용하여 첫 번째 이미지 URL을 설정
    @Mapping(target = "imageUrl", expression = "java(getFirstImageUrl(newsItem.getImageUrls()))")
    News toNews(TossNewsDto.NewsItem newsItem);

    // 첫 번째 이미지 URL을 가져오는 메서드
    default String getFirstImageUrl(List<String> imageUrls) {
        return (imageUrls != null && !imageUrls.isEmpty()) ? imageUrls.get(0) : null;
    }

}
