package com.junwoo.doubleup.domain.stock.service;

import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {

	private final StockRepository stockRepository;
}
