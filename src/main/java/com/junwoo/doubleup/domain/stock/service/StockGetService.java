package com.junwoo.doubleup.domain.stock.service;

import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockGetService {

	private final StockRepository stockRepository;
	private final StockService stockService;

	@Transactional(readOnly = true)
	public List<Stock> findAll() {
		return stockRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Stock findById(Long id) {
		return stockRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 주식이 존재하지 않습니다."));
	}

	@Transactional(readOnly = true)
	public List<Stock> findAllByFilter(Pageable pageable, String sortingValue) {

		if(sortingValue.equals("marketCap")) {
			return stockRepository.findAllByOrderByMarketCapDesc(pageable);
		}

		// todo: 예외 처리
		return stockRepository.findAll();
	}
}
