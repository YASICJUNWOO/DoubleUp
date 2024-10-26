import {Button, CardProps, Flex, Space, Typography} from 'antd';
// import { TinyColumn } from '@ant-design/charts';
import {Card} from "../../../Card/Card";
import {TinyColumn} from "@ant-design/charts"; // 커스텀 Card 컴포넌트 임포트

// ChartData 타입 정의: 숫자 네 개로 구성된 배열
type ChartData = [number, number, number, number];

// StatsColumnChartProps 타입 정의: 차트 데이터와 선택적인 색상을 받음
type StatsColumnChartProps = {
    data: ChartData;  // 숫자 4개로 구성된 데이터 배열
    color?: string;   // 선택적인 색상 속성
};

// ColumnChart 컴포넌트는 현재 주석 처리됨
// TinyColumn을 사용하여 미니 차트를 생성하려 했으나 TinyColumn 사용 불가로 인해 주석 처리됨
const ColumnChart = ({data, color}: StatsColumnChartProps) => {
    const brandColor = color || '#5B8FF9';  // 기본 색상 설정
    const config = {
        height: 64,
        autoFit: true,  // 크기 자동 조정
        data,           // 차트 데이터
        color: brandColor,  // 색상 설정
        tooltip: {
            customContent: function (x: any, data: any) {
                return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;  // 툴팁 내용 커스터마이징
            },
        },
    };
    return <TinyColumn {...config} />;  // TinyColumn을 사용한 미니 차트 렌더링
};

type Props = {
    title: string;  // 카드 타이틀
    onEdit: () => void;  // 수정 버튼 클릭 시 호출할 함수
    onDelete: () => void;  // 삭제 버튼 클릭 시 호출할 함수
} & CardProps;  // Card 컴포넌트의 속성 추가

// PortfolioStatCard 컴포넌트 정의
export const PortfolioHeaderCard = ({
                                        title,
                                        onEdit,
                                        onDelete,
                                        ...others  // 추가 속성들 (CardProps)
                                    }: Props) => {
    return (
        <Card {...others}>
            <Flex justify="space-between" align="center">
                <Typography.Title
                    level={2}
                    style={{margin: 0}}  // 마진을 0으로 설정하여 여백 제거
                >
                    {title} {/* 타이틀 표시 */}
                </Typography.Title>
                <Space>
                    <Button
                        color="default"
                        variant="outlined"
                        onClick={onEdit}
                    >
                        수정하기
                    </Button>
                    <Button
                        color="danger"
                        variant="solid"
                        onClick={onDelete}  // 삭제 버튼 클릭 시 onDelete 함수 호출
                    >
                        삭제하기
                    </Button>
                </Space>
            </Flex>
        </Card>
    );
};
