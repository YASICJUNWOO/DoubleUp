import {useNProgress} from '@tanem/react-nprogress'; // nprogress 훅을 사용하여 애니메이션 상태 관리
import {NContainer} from './Container'; // 커스텀 Container 컴포넌트
import {Bar} from './Bar'; // 진행 상태 바를 나타내는 컴포넌트
import {NSpinner} from './Spinner'; // 스피너 컴포넌트

// 컴포넌트에 전달될 Props 타입 정의
type Props = {
    isAnimating?: boolean;  // 애니메이션 상태를 결정하는 플래그
};

// NProgress 컴포넌트 정의
export const NProgress = ({ isAnimating }: Props) => {
    // useNProgress 훅을 통해 애니메이션 관련 데이터 가져옴
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating,  // isAnimating이 true일 때 애니메이션 진행
    });

    return (
        // NContainer 컴포넌트로 NProgress의 기본 컨테이너를 설정
        <NContainer animationDuration={animationDuration} isFinished={isFinished}>
            {/* Bar 컴포넌트를 사용해 진행 상태 바를 표시 */}
            <Bar animationDuration={animationDuration} progress={progress} />
            {/* NSpinner 컴포넌트로 스피너를 표시 */}
            <NSpinner />
            {/*
              이 예제는 UI를 깔끔하게 유지하기 위해 스피너 컴포넌트를 사용하지 않음.
              필요한 경우, 사용자의 요구에 맞게 적절한 컴포넌트를 렌더링할 수 있음.
              */}
        </NContainer>
    );
};
