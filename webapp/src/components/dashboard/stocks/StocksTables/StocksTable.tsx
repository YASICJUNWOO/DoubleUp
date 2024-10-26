import {Avatar, Table, TableProps, Typography,} from 'antd';
import {IStock} from "../../../../interface/interface";
import {useImageErrorHandling} from "../../../../util/image-loader";
import React from "react";
import {useNavigate} from "react-router-dom";

// const COLUMNS = [
//   {
//     title: 'Name',
//     dataIndex: 'project_name',
//     key: 'proj_name',
//     render: (_: any, { project_name }: Projects) => (
//       <Typography.Paragraph
//         ellipsis={{ rows: 1 }}
//         className="text-capitalize"
//         style={{ marginBottom: 0 }}
//       >
//         {project_name.substring(0, 20)}
//       </Typography.Paragraph>
//     ),
//   },
//   {
//     title: 'Client',
//     dataIndex: 'client_name',
//     key: 'proj_client_name',
//   },
//   {
//     title: 'Category',
//     dataIndex: 'project_category',
//     key: 'proj_category',
//     render: (_: any) => <span className="text-capitalize">{_}</span>,
//   },
//   {
//     title: 'Priority',
//     dataIndex: 'priority',
//     key: 'proj_priority',
//     render: (_: any) => {
//       let color: TagProps['color'];
//
//       if (_ === 'low') {
//         color = 'cyan';
//       } else if (_ === 'medium') {
//         color = 'geekblue';
//       } else {
//         color = 'magenta';
//       }
//
//       return (
//         <Tag color={color} className="text-capitalize">
//           {_}
//         </Tag>
//       );
//     },
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'proj_status',
//     render: (_: any) => {
//       let status: BadgeProps['status'];
//
//       if (_ === 'on hold') {
//         status = 'default';
//       } else if (_ === 'completed') {
//         status = 'success';
//       } else {
//         status = 'processing';
//       }
//
//       return <Badge status={status} text={_} className="text-capitalize" />;
//     },
//   },
//   {
//     title: 'Team size',
//     dataIndex: 'team_size',
//     key: 'proj_team_size',
//   },
//   {
//     title: 'Duration',
//     dataIndex: 'project_duration',
//     key: 'project_duration',
//   },
//   {
//     title: 'Start date',
//     dataIndex: 'start_date',
//     key: 'proj_start_date',
//   },
// ];

const COLUMNS = (getImageSrc: any, handleImgError: any) => [
    {
        title: '순위',
        key: 'rank',
        width: '8%',
        render: (_: any, __: any, index: number) => (
            <Typography.Paragraph
                ellipsis={{rows: 1}}
                className="text-capitalize"
                style={{marginBottom: 0}}
            >
                {index + 1}
            </Typography.Paragraph>
        )
    },
    {
        title: '티커',
        dataIndex: 'symbol',
        key: 'symbol',
        render: (_: any, {symbol}: IStock) => (
            <Typography.Paragraph
                ellipsis={{rows: 1}}
                className="text-capitalize"
                style={{marginBottom: 0}}
            >
                {symbol}
            </Typography.Paragraph>
        ),
    },
    {
        title: '종목명',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: IStock) => {
            return (
                <Typography.Paragraph
                    ellipsis={{rows: 1}}
                    className="text-capitalize"
                    style={{marginBottom: 0}}
                >
                    <Avatar
                        style={{marginRight: "10px"}}
                        src={getImageSrc(record.symbol, text)}
                        onError={() => handleImgError(record.symbol)}
                    />
                    {text}
                </Typography.Paragraph>
            );
        }
    },
    {
        title: "시장",
        dataIndex: "market",
        key: "market"
    },
    {
        title: '시가총액',
        dataIndex: 'marketCap',
        key: 'marketCap',
    },
];

type Props = {
    data: IStock[];
} & TableProps<any>;

export const StocksTable = ({data, ...others}: Props) => {

    const navigate = useNavigate();
    const {getImageSrc, handleImgError} = useImageErrorHandling(); // 훅을 컴포넌트 내부에서 호출

    return (
        <Table
            dataSource={data}
            columns={COLUMNS(getImageSrc, handleImgError)} // 컬럼 데이터를 함수로 전달
            className="overflow-scroll"
            onRow={(record) => {
                return {
                    onClick: () => {
                        // 주식 상세 페이지로 이동
                        navigate(`/dashboards/stocks/detail/${record.stockId}`);
                    },
                };
            }}
            {...others}
        />
    );
};
