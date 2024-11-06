import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import {ConfigProvider} from "antd";
import {AuthProvider} from "./context/AuthContext";
import routes from "./routes/routes";
import {StylesContext} from './context';
import {persistor, store} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {HelmetProvider} from "react-helmet-async";

export const COLOR = {
    50: '#e0f1ff',
    100: '#b0d2ff',
    200: '#7fb0ff',
    300: '#4d8bff',
    400: '#1e79fe',
    500: '#076ee5',
    600: '#0062b3',
    700: '#004f81',
    800: '#003650',
    900: '#001620',
    borderColor: '#E7EAF3B2',
};

function App() {
    return (
        <AuthProvider>
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <HelmetProvider>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: COLOR['500'],
                                    borderRadius: 6,
                                    fontFamily: 'Lato, sans-serif',
                                },
                                components: {
                                    Breadcrumb: {
                                        // linkColor: 'rgba(0,0,0,.8)',
                                        // itemColor: 'rgba(0,0,0,.8)',
                                    },
                                    Button: {
                                        colorLink: COLOR['500'],
                                        colorLinkActive: COLOR['700'],
                                        colorLinkHover: COLOR['300'],
                                    },
                                    Calendar: {
                                        colorBgContainer: 'none',
                                    },
                                    Card: {
                                        colorBorderSecondary: COLOR['borderColor'],
                                    },
                                    Carousel: {
                                        colorBgContainer: COLOR['800'],
                                        dotWidth: 8,
                                    },
                                    Rate: {
                                        colorFillContent: COLOR['100'],
                                        colorText: COLOR['600'],
                                    },
                                    Segmented: {
                                        colorBgLayout: COLOR['100'],
                                        borderRadius: 6,
                                        colorTextLabel: '#000000',
                                    },
                                    Table: {
                                        borderColor: COLOR['100'],
                                        colorBgContainer: 'none',
                                        headerBg: 'none',
                                        rowHoverBg: COLOR['50'],
                                    },
                                    Tabs: {
                                        colorBorderSecondary: COLOR['100'],
                                    },
                                    Timeline: {
                                        dotBg: 'none',
                                    },
                                    Typography: {
                                        colorLink: COLOR['500'],
                                        colorLinkActive: COLOR['700'],
                                        colorLinkHover: COLOR['300'],
                                        linkHoverDecoration: 'underline',
                                    },
                                },
                                // algorithm:
                                // mytheme === 'dark'
                                // ? antdTheme.darkAlgorithm
                                // : antdTheme.defaultAlgorithm,
                            }}
                        >
                            <StylesContext.Provider
                                value={{
                                    rowProps: {
                                        gutter: [
                                            {xs: 8, sm: 16, md: 24, lg: 32},
                                            {xs: 8, sm: 16, md: 24, lg: 32},
                                        ],
                                    },
                                    carouselProps: {
                                        autoplay: true,
                                        dots: true,
                                        dotPosition: 'bottom',
                                        infinite: true,
                                        slidesToShow: 3,
                                        slidesToScroll: 1,
                                    },
                                }}
                            >
                                <RouterProvider router={routes}/>
                                {/*<BrowserRouter>*/}
                                {/*    <Layout>*/}
                                {/*        <AppHeader/>*/}
                                {/*        <Content style={{padding: '20px', marginTop: '10px', background: '#ffffff'}}>*/}
                                {/*            <Routes>*/}
                                {/*                <Route path="/play" element={<Play/>}/>*/}
                                {/*                //============= Default Route ==============*/}
                                {/*                /!* 루트 경로(/)를 /stocks로 리디렉션 *!/*/}
                                {/*                <Route path="/" element={<Navigate to="/stocks/rank"/>}/>*/}

                                {/*                //============= Member ==============*/}
                                {/*                <Route path="/login" element={<Login/>}/>*/}
                                {/*                <Route path="/register" element={<Register/>}/>*/}
                                {/*                <Route path="/members" element={<MemberList/>}/>*/}
                                {/*                <Route path="/members/:id" element={<Profile/>}/>*/}
                                {/*                <Route path="/find-password" element={<FindAccount/>}/>*/}

                                {/*                //============= Stock ==============*/}
                                {/*                <Route path="/stocks" element={<StockList/>}/>*/}
                                {/*                <Route path="/stocks/:id" element={<StockDetail/>}/>*/}
                                {/*                <Route path="/stocks/rank" element={<NewStockList/>}/>*/}

                                {/*                //============= Portfolio ==============*/}
                                {/*                <Route path="/portfolio" element={<PortfolioList/>}/>*/}
                                {/*                <Route path="/portfolio/:id" element={<PortfolioDetail/>}/>*/}
                                {/*                <Route path="/portfolio/create" element={<NewPortfolioCreate isEdit={false}/>}/>*/}
                                {/*                <Route path="/portfolio/edit/:id" element={<NewPortfolioCreate isEdit={true}/>}/>*/}
                                {/*            </Routes>*/}
                                {/*        </Content>*/}
                                {/*    </Layout>*/}
                                {/*</BrowserRouter>*/}

                            </StylesContext.Provider>
                        </ConfigProvider>
                    </HelmetProvider>
                </Provider>
            </PersistGate>
        </AuthProvider>
    );
}

export default App;
