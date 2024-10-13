package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.member.repository.MemberRepository;
import com.junwoo.doubleup.domain.portfolio.repository.PortfolioRepository;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PortfolioDataInitializer implements DataInitializer {

	private final PortfolioRepository portfolioRepository;

	private final StockRepository stockRepository;
	private final MemberRepository memberRepository;

	@Override
	public void init() {

		if(portfolioRepository.count() > 0) {
			return;
		}
	}

}
