package com.junwoo.doubleup.domain.stocknews.repository;

import com.junwoo.doubleup.domain.stocknews.entity.NewsStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsStockRepository extends JpaRepository<NewsStock, Long> {

    // stockId와 newsId로 newsStock이 존재하는지 확인한다.
    Boolean existsByStock_StockIdAndNews_Id(Long stockId, String newsId);

    // stockSymbol로 newsStock을 찾는다.
    List<NewsStock> findByStock_StockId(Long stockId);
}
