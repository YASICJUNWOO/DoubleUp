package com.junwoo.doubleup.domain.portfolio.service;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.service.MemberGetService;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.portfolio.mapper.PortfolioMapper;
import com.junwoo.doubleup.domain.portfolio.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PortfolioService {

	private final PortfolioMapper portfolioMapper = PortfolioMapper.INSTANCE;

	private final PortfolioRepository portfolioRepository;

	private final PortfolioStockService portfolioStockService;
	private final PortfolioGetService portfolioGetService;
	private final MemberGetService memberGetService;

	@Transactional
	public Portfolio addPortfolio(PortfolioAddRequest portfolioAddRequest) {
		Member member = memberGetService.findById(portfolioAddRequest.getMemberId());
		Portfolio portfolio = portfolioMapper.toEntity(member, portfolioAddRequest);

		// PortfolioStocks 생성
		List<PortfolioStock> portfolioStocks =
				portfolioStockService.createPortfolioStocks(portfolioAddRequest.getPortfolioStocks());

		portfolio.addPortfolioStock(portfolioStocks);
		return portfolioRepository.save(portfolio);
	}

	@Transactional
	public Portfolio updatePortfolio(Long portfolioId, PortfolioAddRequest portfolioAddRequest) {
		Portfolio findById = portfolioGetService.findById(portfolioId);

		// PortfolioStocks 생성
		List<PortfolioStock> portfolioStocks =
				portfolioStockService.createPortfolioStocks(portfolioAddRequest.getPortfolioStocks());

		// Portfolio 업데이트
		return findById.update(portfolioAddRequest, portfolioStocks);
	}

}
