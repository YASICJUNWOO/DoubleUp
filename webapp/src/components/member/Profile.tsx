import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Button, Card, Input, Spin} from "antd";

interface MemberInfo {
    id: number;
    name: string;
    email: string;
}

const Profile: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const {id} = useParams<{ id: string }>();
    const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [editedName, setEditedName] = useState("");

    useEffect(() => {
        axios.get(`/api/member/${id}`)
            .then(res => {
                console.log(res);
                setMemberInfo(res.data);
                setEditedName(res.data.name);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // 오류 발생 시에도 로딩 상태를 종료
            });
    }, []); // id를 의존성 배열에 추가

    //=========================================================================================================
    const handleEditClick = () => {
        setIsEditClicked(true);
    };

    const handleSaveClick = () => {
        // 여기서 실제로 이름을 저장하는 로직을 구현할 수 있습니다.
        setIsEditClicked(false);
    };

    const handleCancelClick = () => {
        if (memberInfo) {
            setEditedName(memberInfo.name); // 수정 취소 시 기존 이름으로 리셋
        }
        setIsEditClicked(false);
    };
    //=========================================================================================================

    return (
        <Spin spinning={loading}>
            <Card title="Member Info" bordered={true} style={{width: 300, margin: "20px", cursor: "pointer"}}>
                {isEditClicked ? (
                    <div>
                        <Input
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            style={{marginBottom: "10px"}}
                        />
                        <Button type="primary" onClick={handleSaveClick} style={{marginRight: "10px"}}>
                            Save
                        </Button>
                        <Button onClick={handleCancelClick}>Cancel</Button>
                    </div>
                ) : (
                    <div>
                        <div><strong>Name:</strong> {memberInfo ? memberInfo.name : "Loading..."}</div>
                        <Button type="link" onClick={handleEditClick}>Edit</Button>
                    </div>
                )}
            </Card>
        </Spin>
    );
}

export default Profile;
