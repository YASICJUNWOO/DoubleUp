import React from "react";
import {Button, message} from "antd";
import {Template} from "../../../interface/interface";
import {templateList} from "./templateList";

interface Props {
    setTemplate: (template: Template) => void;
}

const PortfolioTemplate: React.FC<Props> = ({setTemplate}) => {

    const [messageApi, contextHolder] = message.useMessage();

    const success = (template: string) => {
        messageApi.open({
            type: 'success',
            content: `템플릿 ${template} 선택 완료`,
        });
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            {contextHolder}
            {
                templateList.map((template: Template) => (
                    <Button key={template.name} style={{marginRight: "10px"}}
                            onClick={() => {
                                setTemplate(templateList.find((t: Template) => t.name === template.name)!);
                                success(template.name);
                            }}>
                        {template.name}
                    </Button>
                ))
            }
        </div>
    );

}

export default PortfolioTemplate;