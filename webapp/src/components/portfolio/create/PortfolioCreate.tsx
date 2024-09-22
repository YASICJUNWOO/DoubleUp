import React, {useState} from "react";
import {Col, Row} from "antd";
import PortfolioTemplate from "./PortfolioTemplate";
import PortfolioRate from "./PortfolioRate";
import {Template} from "../../../interface/interface";
import {templateList} from "./templateList";

const PortfolioCreate: React.FC = () => {
    const [template, setTemplate] = useState<Template>(templateList[0]);

    return (
        <>
            <Row id='total'justify="center" style={{marginBottom:"20px"}}>
                <Col id='discrioption' span={14} style={{textAlign: "center"}}>
                    <h1>포트폴리오 만들기</h1>
                    <p style={{fontSize: "16px", color: "#888"}}>
                        이 페이지에서 나만의 주식 포트폴리오를 만들어 보세요.

                    </p>
                    <p style={{fontSize: "16px", color: "#888"}}>
                        템플릿을 선택하고, 나만의 투자 전략을 기반으로 주식들을 추가하여
                        개인 맞춤형 포트폴리오를 구성할 수 있습니다.
                    </p>
                </Col>
            </Row>
            <Row id='selectTemplate' style={{justifyContent: "center"}}>
                <Col span={12}>
                    <PortfolioTemplate setTemplate={setTemplate}/>
                </Col>
            </Row>
            <Row id="portfolioRate">
                <Col span={24}>
                    <PortfolioRate template={template!}/>
                </Col>
            </Row>
        </>
    );
}

export default PortfolioCreate;