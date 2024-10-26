import {CardProps, Col, Flex, Row, Tag, Typography} from 'antd';
// import { TinyColumn } from '@ant-design/charts';
import CountUp from 'react-countup'; // CountUp을 사용하여 숫자를 애니메이션 효과로 표시
import {Card} from "../../../Card/Card"; // 커스텀 Card 컴포넌트 임포트

// ChartData 타입 정의: 숫자 네 개로 구성된 배열
type ChartData = [number, number, number, number];

// StatsColumnChartProps 타입 정의: 차트 데이터와 선택적인 색상을 받음
type StatsColumnChartProps = {
  data: ChartData;  // 숫자 4개로 구성된 데이터 배열
  color?: string;   // 선택적인 색상 속성
};

// ColumnChart 컴포넌트는 현재 주석 처리됨
// TinyColumn을 사용하여 미니 차트를 생성하려 했으나 TinyColumn 사용 불가로 인해 주석 처리됨
// const ColumnChart = ({ data, color }: StatsColumnChartProps) => {
//   const brandColor = color || '#5B8FF9';  // 기본 색상 설정
//   const config = {
//     height: 64,
//     autoFit: true,  // 크기 자동 조정
//     data,           // 차트 데이터
//     color: brandColor,  // 색상 설정
//     tooltip: {
//       customContent: function (x: any, data: any) {
//         return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;  // 툴팁 내용 커스터마이징
//       },
//     },
//   };
//   return <TinyColumn {...config} />;  // TinyColumn을 사용한 미니 차트 렌더링
// };

type Props = {
  title: string;  // 카드 타이틀
  value: number | string;  // 표시할 값 (숫자 또는 문자열)
  data: ChartData;  // 차트 데이터 (숫자 4개)
  diff: number;  // 차이값 (증가 또는 감소율)
  asCurrency?: boolean;  // 화폐로 표시할지 여부
} & CardProps;  // Card 컴포넌트의 속성 추가

// PortfolioStatCard 컴포넌트 정의
export const StatsCard = ({
                            data,  // 차트 데이터
                            diff,  // 차이값
                            title,  // 카드 타이틀
                            value,  // 표시할 값
                            asCurrency,  // 화폐 여부
                            ...others  // 추가 속성들 (CardProps)
                          }: Props) => {
  return (
      <Card {...others}>
        <Flex vertical>
          <Typography.Text className="text-capitalize m-0">
            {title}  {/* 타이틀 표시 */}
          </Typography.Text>
          <Row>
            <Col span={14}>
              <Typography.Title level={2}>
                {/* 숫자일 경우 CountUp으로 애니메이션 효과 적용 */}
                {typeof value === 'number' ? (
                    <>
                      {asCurrency && <span>$</span>}  {/* 화폐 표시 옵션 */}
                      <CountUp end={value} />  {/* 애니메이션으로 숫자 표시 */}
                    </>
                ) : (
                    value  // 문자열일 경우 그대로 출력
                )}
              </Typography.Title>
            </Col>
            <Col span={10}>
              {/* ColumnChart는 TinyColumn 문제로 인해 주석 처리됨 */}
              {/*<ColumnChart data={data} />*/}
            </Col>
          </Row>
          <Flex align="center">
            {/* diff 값에 따라 태그 색상 설정 (양수면 초록색, 음수면 빨간색) */}
            <Tag color={diff < 0 ? 'red' : 'green'}>{diff}%</Tag>
            <Typography.Text>compared to last month.</Typography.Text>  {/* 비교 문구 */}
          </Flex>
        </Flex>
      </Card>
  );
};
