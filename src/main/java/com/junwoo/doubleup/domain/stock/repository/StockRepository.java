package com.junwoo.doubleup.domain.stock.repository;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {

    //유형별 주식 조회
    boolean existsStockByStockType(StockType stockType);

    List<Stock> findAllByStockTypeOrderByMarketCapDesc(StockType stockType, Pageable pageable);

    Optional<Stock> findBySymbol(String symbol);

    //=====================SEARCH======================
    // Native SQL을 사용한 키워드 검색 및 정렬
    @Query(value = "SELECT * FROM stock WHERE UPPER(name) LIKE UPPER(CONCAT('%', :keyword, '%')) " +
            "ORDER BY LOCATE(UPPER(:keyword), UPPER(name)), name ASC",
            nativeQuery = true)
    List<Stock> searchAndSortByKeywordNative(@Param("keyword") String keyword);
}
