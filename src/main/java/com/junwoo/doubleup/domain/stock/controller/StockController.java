package com.junwoo.doubleup.domain.stock.controller;

import com.junwoo.doubleup.domain.stock.service.StockGetService;
import com.junwoo.doubleup.domain.stock.service.StockService;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/stock")
public class StockController {

	private final StockGetService stockGetService;

	@GetMapping("/all")
	private List<Stock> findAll() {
		return stockGetService.findAll();
	}

	@GetMapping("/{id}")
	private Stock findById(@PathVariable(name = "id") Long id) {
		return stockGetService.findById(id);
	}

}
