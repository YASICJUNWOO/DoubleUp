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
	private final MemberGetService memberGetService;

	@Transactional
	public Portfolio addPortfolio(PortfolioAddRequest portfolioAddRequest) {
		Member member = memberGetService.findById(portfolioAddRequest.getMemberId());
		Portfolio portfolio = portfolioMapper.toEntity(member, portfolioAddRequest);

		// Create PortfolioStocks
		List<PortfolioStock> portfolioStocks =
				portfolioStockService.createPortfolioStocks(portfolio, portfolioAddRequest.getPortfolioStocks());

		portfolio.addPortfolioStock(portfolioStocks);
		portfolio.calculateTotalAmount();
		return portfolioRepository.save(portfolio);
	}

}
