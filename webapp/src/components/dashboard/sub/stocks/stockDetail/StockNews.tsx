import {Avatar, CardProps, List, Space, Typography} from "antd";
import {useImageErrorHandling} from "../../../../../util/image-loader";
import {INews} from "../../../../../interface/interface";

type Props = {
    data: INews[];
} & CardProps;

// 뉴스 기사 데이터 타입
interface NewsArticle {
    title: string;
    description: string;
    url: string;
    source: { name: string };
    imageUrl: string;
}


export const StockNews = ({data, ...others}: Props) => {

    const {getImageSrc, handleImgError} = useImageErrorHandling();

    return (
        <List
            itemLayout="vertical"
            dataSource={data.slice(0, 5)}
            renderItem={(data: INews) => (
                <List.Item>
                    <Space style={{justifyContent: "space-between", width: "100%"}}>
                        <div style={{flex: 1}}>
                            <List.Item.Meta
                                title={data.title}
                                description={data.source.name}
                            />
                            <Typography.Paragraph ellipsis={{rows: 2}}>
                                {data.title}
                            </Typography.Paragraph>
                        </div>
                        <Avatar
                            src={data.imageUrl}
                            shape="square"
                            style={{width: 100, height: 100}}
                        />
                    </Space>
                </List.Item>
            )}
        />
    );
};
