import {useState} from "react";

// 이미지 로드 및 오류 시 대체 URL 반환하는 함수
export const useImageErrorHandling = () => {
    const [imgErrorState, setImgErrorState] = useState<{ [key: string]: boolean }>({});

    // 이미지 로드 실패 시 대체 URL 반환
    const getImageSrc = (symbol: string, name: string): string => {
        const isError = imgErrorState[symbol] || false;
        return !isError
            ? `https://static.toss.im/png-icons/securities/icn-sec-fill-${symbol}.png`
            : `https://ui-avatars.com/api/?name=${name}&background=random&rounded=true`;
    };

    // 이미지 로드 오류 처리 함수
    const handleImgError = (symbol: string) => {
        setImgErrorState((prevState) => ({
            ...prevState,
            [symbol]: true, // 종목 심볼을 키로 상태 관리
        }));
        return false; // boolean 값 반환
    };

    return { getImageSrc, handleImgError };
};
