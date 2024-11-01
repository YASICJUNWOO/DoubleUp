import React from "react";
import {Spin, Typography} from "antd";


export const Loading: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBlock: '20px' }}>
            <Spin />
            <Typography.Text style={{marginLeft: '10px'}}>데이터를 불러오는 중입니다...</Typography.Text>
        </div>
    );
};