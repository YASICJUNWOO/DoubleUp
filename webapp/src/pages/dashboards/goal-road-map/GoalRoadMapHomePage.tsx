import React, {useEffect, useState} from "react";
import {deleteGoalRoadMap, getGoalRoadMap, postGoalRoadMap, updateGoalRoadMap} from "../../../constants/api";
import {GoalRoadMapPage} from "./GoalRoadMapPage";
import {GoalRoadMapListPage} from "./GoalRoadMapListPage";
import {IGoalRoadMap} from "../../../interface/interface";

export const GoalRoadMapHomePage: React.FC = () => {

    const [isEdit, setIsEdit] = useState(false);
    const [goalRoadMap, setGoalRoadMap] = useState<IGoalRoadMap | null>(null);

    useEffect(() => {
        fetchGoalRoadMap();
    }, []);

    const fetchGoalRoadMap = () => {
        getGoalRoadMap()
            .then((response) => {
                setGoalRoadMap(response.data);
            })
            .catch((error) => {
                console.error("목표 로드맵 조회 실패:", error);
                setGoalRoadMap(null);
            });
    }

    const handleDelete = () => {
        if (!goalRoadMap) return;

        const pathParams = {
            id: goalRoadMap.id.toString(),
        }
        deleteGoalRoadMap(pathParams)
            .then(() => {
                fetchGoalRoadMap();
            })
            .catch((error) => {
                console.error("목표 로드맵 삭제 실패:", error);
            });
    }

    const handleGoalRoadMapChangeComplete = (body: any) => {

        const promise = isEdit ?
            updateGoalRoadMap({id: goalRoadMap?.id.toString()!}, body) :
            postGoalRoadMap(body);

        promise
            .then((response) => {
                console.log("목표 저장 성공:", response);
                fetchGoalRoadMap();
                setIsEdit(false);
            })
            .catch((error) => {
                console.error("목표 저장 실패:", error);
            });
    }

    const handleEdit = () => {
        setIsEdit(true);
    }

    return (
        <>
            {goalRoadMap ? (
                isEdit ? (
                    <GoalRoadMapPage
                        goalRoadMap={goalRoadMap}
                        isEdit={isEdit}
                        handleGoalRoadMapChangeComplete={handleGoalRoadMapChangeComplete}
                    />
                ) : (
                    <GoalRoadMapListPage
                        goalRoadMap={goalRoadMap}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                )
            ) : (
                <GoalRoadMapPage
                    isEdit={isEdit}
                    handleGoalRoadMapChangeComplete={handleGoalRoadMapChangeComplete}
                />
            )}
        </>
    );
}