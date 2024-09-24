import React, {useEffect} from "react";
import axios from "axios";
import Member from "./Member";

interface MemberInfo {
    id: number;
    name: string;
    email: string;
}

const MemberList: React.FC = () => {

    const [members, setMembers] = React.useState<MemberInfo[]>([]);


    useEffect(() => {
        const fetchMembers = async () => {
            axios.get('/api/member')
                .then(res => {
                    console.log(res);
                    setMembers(res.data)
                })
                .catch(err => {
                    console.error(err);
                });
        }

        fetchMembers();
    }, []);

    return (
        <div>
            <h1>Member List</h1>
            <ul>
                {members.map(member => (
                    <Member id={member.id} name={member.name} email={member.email} key={member.id} />
                ))}
            </ul>
        </div>
    );
}

export default MemberList;