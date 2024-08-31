import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

interface MemberInfo {
    id: number;
    name: string;
    email: string;
}

const Member: React.FC<MemberInfo> = ({ id, name, email }) => {
    return (
        <Link to={`/members/${id}`}>
            <Card
                title={name}
                bordered={true}
                style={{ width: 300, margin: "20px", cursor: "pointer" }}
            >
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Email:</strong> {email}</p>
            </Card>
        </Link>
    );
}

export default Member;
