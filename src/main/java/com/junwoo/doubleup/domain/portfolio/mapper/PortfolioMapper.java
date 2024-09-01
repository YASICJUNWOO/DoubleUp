package com.junwoo.doubleup.domain.portfolio.mapper;

import com.junwoo.doubleup.domain.member.entity.Member;
import com.junwoo.doubleup.domain.portfolio.dto.PortfolioAddRequest;
import com.junwoo.doubleup.domain.portfolio.entity.Portfolio;
import com.junwoo.doubleup.domain.portfolio.entity.PortfolioStock;
import com.junwoo.doubleup.domain.stock.Stock;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface PortfolioMapper {

	PortfolioMapper INSTANCE = Mappers.getMapper(PortfolioMapper.class);

	@Mapping(target = "member", source = "member")
	@Mapping(target = "name", source = "portfolioAddRequest.name")
	Portfolio toEntity(Member member, PortfolioAddRequest portfolioAddRequest);
}
