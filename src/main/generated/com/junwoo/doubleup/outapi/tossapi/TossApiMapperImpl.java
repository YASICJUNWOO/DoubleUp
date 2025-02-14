package com.junwoo.doubleup.outapi.tossapi;

import com.junwoo.doubleup.domain.stocknews.entity.News;
import com.junwoo.doubleup.domain.stocknews.entity.NewsSource;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-23T18:15:24+0900",
    comments = "version: 1.6.0, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
public class TossApiMapperImpl implements TossApiMapper {

    @Override
    public News toNews(TossNewsDto.NewsItem newsItem) {
        if ( newsItem == null ) {
            return null;
        }

        News.NewsBuilder news = News.builder();

        news.id( newsItem.getId() );
        news.title( newsItem.getTitle() );
        news.summary( newsItem.getSummary() );
        news.source( sourceToNewsSource( newsItem.getSource() ) );

        news.imageUrl( getFirstImageUrl(newsItem.getImageUrls()) );

        return news.build();
    }

    protected NewsSource sourceToNewsSource(TossNewsDto.Source source) {
        if ( source == null ) {
            return null;
        }

        NewsSource.NewsSourceBuilder newsSource = NewsSource.builder();

        newsSource.code( source.getCode() );
        newsSource.name( source.getName() );
        newsSource.faviconUrl( source.getFaviconUrl() );
        newsSource.logoImageUrl( source.getLogoImageUrl() );
        newsSource.logoImageUrlDark( source.getLogoImageUrlDark() );

        return newsSource.build();
    }
}
