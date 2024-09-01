import React from "react";
import {Button, Card, Popconfirm} from "antd";
import {Link} from "react-router-dom";
import {DeleteOutlined} from "@ant-design/icons";
import axios from "axios";

interface MemberInfo {
    id: number;
    name: string;
    email: string;
}

const Member: React.FC<MemberInfo> = ({id, name, email}) => {

    const handleDelete = () => {
        axios.delete(`/api/member/${id}`)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (

        <Card
            title={name}
            bordered={true}
            style={{width: 300, margin: "20px"}}
            extra={
                <Popconfirm
                    title="정말 삭제하시겠습니까?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link" icon={<DeleteOutlined/>}/>
                </Popconfirm>
            }
        >
            <Link to={`/members/${id}`} style={{ cursor: "pointer" }}>
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Email:</strong> {email}</p>
            </Link>
        </Card>
    );
}

export default Member;
