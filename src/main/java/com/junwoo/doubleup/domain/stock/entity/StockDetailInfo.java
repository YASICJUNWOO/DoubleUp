package com.junwoo.doubleup.domain.stock.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StockDetailInfo {

    @Id
    private Long stock_id;

    // stock ID를 기본키로 사용
    @JsonIgnore
    @MapsId
    @JoinColumn(name = "stock_id")
    @OneToOne(cascade = CascadeType.ALL)
    private Stock stock;

    @Comment("섹터 카테고리")
    @Enumerated(EnumType.STRING)
    private SectorCategory sectorCategory;

    @Comment("섹터 코드")
    private String sectorCode;

    @Comment("섹터 이름")
    private String sectorName;

    @Comment("대표 이사")
    private String ceo;

    @Comment("주소")
    private String address;

}
