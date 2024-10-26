import {Flex, FlexProps, theme, Typography} from 'antd'; // Ant Design의 Flex, Typography 및 테마 관련 모듈 임포트
import {Link} from 'react-router-dom'; // 리액트 라우터의 Link 컴포넌트 사용
import {CSSProperties} from 'react'; // 스타일을 위한 CSSProperties 타입
import './styles.css'; // 컴포넌트의 스타일 파일 임포트

// LogoProps 타입 정의: 로고 컴포넌트가 받을 여러 속성들 정의
type LogoProps = {
    color: CSSProperties['color'];  // 로고 텍스트의 색상
    imgSize?: {
        h?: number | string;  // 이미지의 높이
        w?: number | string;  // 이미지의 너비 (사용하지 않지만 옵션으로 포함)
    };
    asLink?: boolean;  // 로고가 링크로 동작할지 여부
    href?: string;  // 링크로 사용할 경로 (asLink가 true일 때 사용)
    bgColor?: CSSProperties['backgroundColor'];  // 로고 텍스트의 배경 색상
} & Partial<FlexProps>;  // 추가적으로 FlexProps의 일부 속성들도 받을 수 있음

// Logo 컴포넌트 정의
export const Logo = ({
                         asLink,  // 링크로 사용할지 여부
                         color,  // 텍스트 색상
                         href,  // 링크 경로
                         imgSize,  // 이미지 크기
                         bgColor,  // 텍스트 배경 색상
                         ...others  // FlexProps를 포함한 기타 속성들
                     }: LogoProps) => {
    // Ant Design 테마에서 토큰을 가져옴 (borderRadius 등)
    const {
        token: { borderRadius },
    } = theme.useToken();

    // 로고가 링크로 동작할 때
    return asLink ? (
        // Link 컴포넌트 사용하여 href 경로로 링크 연결
        <Link to={href || '#'} className="logo-link">
            <Flex gap={others.gap || 'small'} align="center" {...others}>  {/* Flex 컴포넌트로 로고와 텍스트 정렬 */}
                <img
                    src="/logo-no-background.png"  // 로고 이미지 경로
                    alt="design sparx logo"  // 이미지 대체 텍스트
                    height={imgSize?.h || 48}  // 이미지 높이를 전달된 값이나 기본값 48로 설정
                />
                <Typography.Title
                    level={5}  // 제목 레벨 설정
                    type="secondary"  // 텍스트 색상 타입 (secondary)
                    style={{
                        color,  // 텍스트 색상
                        margin: 0,  // 기본 여백 제거
                        padding: `4px 8px`,  // 텍스트 주변 여백
                        backgroundColor: bgColor,  // 텍스트 배경 색상
                        borderRadius,  // 테두리 둥글기 적용
                    }}
                >
                    DoubleUp  {/* 텍스트 내용 */}
                </Typography.Title>
            </Flex>
        </Link>
    ) : (
        // 링크로 사용하지 않을 때
        <Flex gap={others.gap || 'small'} align="center" {...others}>  {/* Flex 컴포넌트로 로고와 텍스트 정렬 */}
            <img
                src="/logo-no-background.png"  // 로고 이미지 경로
                alt="design sparx logo"  // 이미지 대체 텍스트
                height={imgSize?.h || 48}  // 이미지 높이를 전달된 값이나 기본값 48로 설정
            />
            <Typography.Title
                level={4}  // 제목 레벨 설정
                type="secondary"  // 텍스트 색상 타입 (secondary)
                style={{
                    color,  // 텍스트 색상
                    margin: 0,  // 기본 여백 제거
                    padding: `4px 8px`,  // 텍스트 주변 여백
                    backgroundColor: bgColor,  // 텍스트 배경 색상
                    borderRadius,  // 테두리 둥글기 적용
                }}
            >
                Antd Admin  {/* 텍스트 내용 */}
            </Typography.Title>
        </Flex>
    );
};
