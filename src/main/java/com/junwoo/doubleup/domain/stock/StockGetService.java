package com.junwoo.doubleup.domain.stock;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockGetService {

	private final StockRepository stockRepository;

	@Transactional(readOnly = true)
	public List<Stock> findAll() {
		return stockRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Stock findById(Long id) {
		return stockRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 주식이 존재하지 않습니다."));
	}
}
