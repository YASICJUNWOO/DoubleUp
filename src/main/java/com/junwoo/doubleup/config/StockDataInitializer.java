package com.junwoo.doubleup.config;

import com.junwoo.doubleup.domain.stock.entity.Stock;
import com.junwoo.doubleup.domain.stock.entity.StockType;
import com.junwoo.doubleup.domain.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class StockDataInitializer implements DataInitializer {

	private final StockRepository stockRepository;

	@Override
	@Transactional
	public void init() {
		// 한국 개별주 15개
		Stock stock1 = Stock.builder().id(1L).name("삼성전자").symbol("005930").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock2 = Stock.builder().id(2L).name("SK하이닉스").symbol("000660").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock3 = Stock.builder().id(3L).name("네이버").symbol("035420").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock4 = Stock.builder().id(4L).name("카카오").symbol("035720").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock5 = Stock.builder().id(5L).name("현대자동차").symbol("005380").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock6 = Stock.builder().id(6L).name("삼성바이오로직스").symbol("207940").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock7 = Stock.builder().id(7L).name("LG화학").symbol("051910").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock8 = Stock.builder().id(8L).name("셀트리온").symbol("068270").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock9 = Stock.builder().id(9L).name("POSCO홀딩스").symbol("005490").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock10 = Stock.builder().id(10L).name("삼성SDI").symbol("006400").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock11 = Stock.builder().id(11L).name("현대모비스").symbol("012330").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock12 = Stock.builder().id(12L).name("LG전자").symbol("066570").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock13 = Stock.builder().id(13L).name("KT&G").symbol("033780").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock14 = Stock.builder().id(14L).name("SK텔레콤").symbol("017670").market("KOSPI").stockType(StockType.COMMON).build();
		Stock stock15 = Stock.builder().id(15L).name("LG생활건강").symbol("051900").market("KOSPI").stockType(StockType.COMMON).build();

		// 한국 ETF 5개
		Stock etf1 = Stock.builder().id(16L).name("TIGER 200").symbol("102110").market("KOSPI").stockType(StockType.ETF).build();
		Stock etf2 = Stock.builder().id(17L).name("KODEX 200").symbol("069500").market("KOSPI").stockType(StockType.ETF).build();
		Stock etf3 = Stock.builder().id(18L).name("KODEX 레버리지").symbol("122630").market("KOSPI").stockType(StockType.ETF).build();
		Stock etf4 = Stock.builder().id(19L).name("KODEX 인버스").symbol("114800").market("KOSPI").stockType(StockType.ETF).build();
		Stock etf5 = Stock.builder().id(20L).name("TIGER 미국나스닥100").symbol("133690").market("KOSPI").stockType(StockType.ETF).build();

		// 미국 개별주 15개
		Stock usStock1 = Stock.builder().id(21L).name("Apple").symbol("AAPL").market("NASDAQ").stockType(StockType.COMMON).build();
		Stock usStock2 = Stock.builder().id(22L).name("Microsoft").symbol("MSFT").market("NASDAQ").stockType(StockType.COMMON).build();
		Stock usStock3 = Stock.builder().id(23L).name("Amazon").symbol("AMZN").market("NASDAQ").stockType(StockType.COMMON).build();
		Stock usStock4 = Stock.builder().id(24L).name("Google").symbol("GOOGL").market("NASDAQ").stockType(StockType.COMMON).build();
		Stock usStock5 = Stock.builder().id(25L).name("Tesla").symbol("TSLA").market("NASDAQ").stockType(StockType.COMMON).build();
		Stock usStock6 = Stock.builder().id(26L).name("NVIDIA").symbol("NVDA").market("NASDAQ").stockType(StockType.COMMON).build();
		Stock usStock7 = Stock.builder().id(27L).name("Meta Platforms").symbol("META").market("NASDAQ").stockType(StockType.COMMON).build();
		Stock usStock8 = Stock.builder().id(28L).name("Berkshire Hathaway").symbol("BRK.B").market("NYSE").stockType(StockType.COMMON).build();
		Stock usStock9 = Stock.builder().id(29L).name("Johnson & Johnson").symbol("JNJ").market("NYSE").stockType(StockType.COMMON).build();
		Stock usStock10 = Stock.builder().id(30L).name("Visa").symbol("V").market("NYSE").stockType(StockType.COMMON).build();
		Stock usStock11 = Stock.builder().id(31L).name("JPMorgan Chase").symbol("JPM").market("NYSE").stockType(StockType.COMMON).build();
		Stock usStock12 = Stock.builder().id(32L).name("Procter & Gamble").symbol("PG").market("NYSE").stockType(StockType.COMMON).build();
		Stock usStock13 = Stock.builder().id(33L).name("Exxon Mobil").symbol("XOM").market("NYSE").stockType(StockType.COMMON).build();
		Stock usStock14 = Stock.builder().id(34L).name("Walmart").symbol("WMT").market("NYSE").stockType(StockType.COMMON).build();
		Stock usStock15 = Stock.builder().id(35L).name("Pfizer").symbol("PFE").market("NYSE").stockType(StockType.COMMON).build();

		// 미국 ETF 5개
		Stock usEtf1 = Stock.builder().id(36L).name("SPDR S&P 500 ETF Trust").symbol("SPY").market("NYSE").stockType(StockType.ETF).build();
		Stock usEtf2 = Stock.builder().id(37L).name("Invesco QQQ Trust").symbol("QQQ").market("NASDAQ").stockType(StockType.ETF).build();
		Stock usEtf3 = Stock.builder().id(38L).name("Vanguard Total Stock Market ETF").symbol("VTI").market("NYSE").stockType(StockType.ETF).build();
		Stock usEtf4 = Stock.builder().id(39L).name("iShares Russell 2000 ETF").symbol("IWM").market("NYSE").stockType(StockType.ETF).build();
		Stock usEtf5 = Stock.builder().id(40L).name("ARK Innovation ETF").symbol("ARKK").market("NYSE").stockType(StockType.ETF).build();

		stockRepository.saveAll(List.of(
				stock1, stock2, stock3, stock4, stock5, stock6, stock7, stock8, stock9, stock10, stock11, stock12, stock13, stock14, stock15,
				etf1, etf2, etf3, etf4, etf5,
				usStock1, usStock2, usStock3, usStock4, usStock5, usStock6, usStock7, usStock8, usStock9, usStock10, usStock11, usStock12, usStock13, usStock14, usStock15,
				usEtf1, usEtf2, usEtf3, usEtf4, usEtf5
		));
	}
}
