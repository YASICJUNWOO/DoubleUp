package com.junwoo.doubleup.domain.stock;

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

	private final StockService stockService;
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
