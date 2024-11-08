    // MANUFACTURING,           // 제조업
    // CONSTRUCTION_REAL_ESTATE, // 건설 및 부동산업
    // IT_COMMUNICATIONS,        // 정보통신 및 IT 서비스업
    // WHOLESALE_RETAIL,         // 도소매업
    // FINANCE_INSURANCE,        // 금융 및 보험업
    // TRANSPORT_LOGISTICS,      // 운송 및 물류업
    // SCIENCE_TECH_SERVICES,    // 과학 및 기술 서비스업
    // EDUCATION,                // 교육 서비스업
    // ARTS_ENTERTAINMENT,       // 예술, 스포츠 및 여가관련 서비스업
    // HOSPITALITY_FOOD,         // 숙박 및 요식업
    // PUBLIC_ENVIRONMENTAL,     // 공공 서비스 및 환경업
    // BUSINESS_SERVICES,        // 기업 대상 전문 서비스업
    // TECHNICAL_SERVICES,       // 기술 및 전문지식 기반 서비스업
    // PERSONAL_SERVICES,        // 개인 대상 서비스업
    // AGRICULTURE               // 농업, 임업 및 어업
export const SectorType = {
    MANUFACTURING: '제조업',
    CONSTRUCTION_REAL_ESTATE: '건설 및 부동산업',
    IT_COMMUNICATIONS: '정보통신 및 IT 서비스업',
    WHOLESALE_RETAIL: '도소매업',
    FINANCE_INSURANCE: '금융 및 보험업',
    TRANSPORT_LOGISTICS: '운송 및 물류업',
    SCIENCE_TECH_SERVICES: '과학 및 기술 서비스업',
    EDUCATION: '교육 서비스업',
    ARTS_ENTERTAINMENT: '예술, 스포츠 및 여가관련 서비스업',
    HOSPITALITY_FOOD: '숙박 및 요식업',
    PUBLIC_ENVIRONMENTAL: '공공 서비스 및 환경업',
    BUSINESS_SERVICES: '기업 대상 전문 서비스업',
    TECHNICAL_SERVICES: '기술 및 전문지식 기반 서비스업',
    PERSONAL_SERVICES: '개인 대상 서비스업',
    AGRICULTURE: '농업, 임업 및 어업'
} as const;


export type SectorTypeKey = keyof typeof SectorType;
export type SectorTypeValue = typeof SectorType[SectorTypeKey];

// value