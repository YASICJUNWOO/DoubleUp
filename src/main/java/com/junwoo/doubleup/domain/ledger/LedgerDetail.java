package com.junwoo.doubleup.domain.ledger;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LedgerDetail {

    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ledgerDetailId;

    @Comment("일")
    private String date;

    @Comment("타입 - 수입 / 지출")
    private String type;

    @Comment("카테고리")
    private String category;

    @Comment("지불 방식")
    private String payment;

    @Comment("내역")
    private String name;

    @Comment("금액")
    private Double amount;

    @JsonIgnore
    @Setter
    @ManyToOne
    @JoinColumn(name = "ledger_id")
    private Ledger ledger;
}
