package com.junwoo.doubleup.domain.portfolio.service;

import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.repository.PortfolioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PortfolioGetService {

	private final PortfolioRepository portfolioRepository;


	@Transactional(readOnly = true)
	public List<Portfolio> findAll() {
		return portfolioRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Portfolio findById(Long id) {
		return portfolioRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 포트폴리오가 없습니다. id=" + id));
	}

	@Transactional
	public void delete(Long id) {
		Portfolio portfolio = portfolioRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Portfolio with id " + id + " not found"));
		portfolioRepository.delete(portfolio);
	}
}
