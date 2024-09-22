package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.member.repository.MemberRepository;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.portfolio.repository.PortfolioRepository;
import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class PortfolioDataInitializer implements DataInitializer {

	private final PortfolioRepository portfolioRepository;

	private final StockRepository stockRepository;
	private final MemberRepository memberRepository;

	@Override
	public void init() {
		Member member = memberRepository.findById(1L).orElseThrow();

		Portfolio portfolio = Portfolio.builder()
				.id(1L)
				.member(member)
				.name("테스트 포트폴리오")
				.build();

		portfolioRepository.save(portfolio); //영속화

		Stock stock1 = stockRepository.findById(1L).orElseThrow();
		Stock stock2 = stockRepository.findById(2L).orElseThrow();
		Stock stock3 = stockRepository.findById(3L).orElseThrow();

		PortfolioStock portfolioStock1 = PortfolioStock.builder()
				.portfolio(portfolio)
				.stock(stock1)
				.quantity(10)
				.totalAmount(BigDecimal.valueOf(1000000))
				.averagePrice(BigDecimal.valueOf(100000))
				.build();

		PortfolioStock portfolioStock2 = PortfolioStock.builder()
				.portfolio(portfolio)
				.stock(stock2)
				.quantity(5)
				.totalAmount(BigDecimal.valueOf(500000))
				.averagePrice(BigDecimal.valueOf(100000))
				.build();

		PortfolioStock portfolioStock3 = PortfolioStock.builder()
				.portfolio(portfolio)
				.stock(stock3)
				.quantity(5)
				.averagePrice(BigDecimal.valueOf(30000))
				.totalAmount(BigDecimal.valueOf(30000).multiply(BigDecimal.valueOf(5)))
				.build();

		portfolio.addPortfolioStock(portfolioStock1);
		portfolio.addPortfolioStock(portfolioStock2);
		portfolio.addPortfolioStock(portfolioStock3);

		portfolioRepository.save(portfolio);
	}

}
