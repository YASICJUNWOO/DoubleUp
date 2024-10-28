package com.junwoo.doubleup.domain.stocknews;

import com.junwoo.doubleup.domain.stocknews.entity.News;
import com.junwoo.doubleup.domain.stocknews.service.NewsGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsGetService newsGetService;

    @GetMapping("/stocks")
    public List<News> getNewsByStock(@RequestParam(name = "stockId") Long stockId) {
        return newsGetService.getNewsByStock(stockId);
    }

}
