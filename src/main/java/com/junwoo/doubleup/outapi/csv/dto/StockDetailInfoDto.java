package com.junwoo.doubleup.outapi.csv.dto;

import com.junwoo.doubleup.domain.stock.entity.SectorCategory;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class StockDetailInfoDto {

    private String StockSymbol;

    private String sectorCode;

    private String sectorName;

    private SectorCategory sectorCategory;

    private String ceo;

    private String address;
}
