package com.junwoo.doubleup.domain.stocknews.repository;

import com.junwoo.doubleup.domain.stocknews.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, Long> {

    // id로 존재하는지 확인
    boolean existsById(String id);

    // id로 찾기
    Optional<News> findById(String id);
}
