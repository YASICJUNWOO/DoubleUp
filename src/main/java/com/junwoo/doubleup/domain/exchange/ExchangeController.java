package com.junwoo.doubleup.domain.exchange;

import com.junwoo.doubleup.outapi.lsapi.LsRealTimeApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/exchange")
@RequiredArgsConstructor
public class ExchangeController {

    private final Map<String, BigDecimal> realTimePriceStore = LsRealTimeApiService.realTimePriceStore;

    // 환율 조회
    @GetMapping
    public BigDecimal exchange(@RequestParam(name = "currency") String currency) {
        return realTimePriceStore.get(currency);
    }

}
