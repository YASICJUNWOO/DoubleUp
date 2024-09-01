package com.junwoo.doubleup.domain.stock;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {

	private final StockRepository stockRepository;
}
