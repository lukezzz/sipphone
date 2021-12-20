import { useContext } from "react";
import ProLayout, { DefaultFooter } from "@ant-design/pro-layout";
import { SmileOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { CiscoLogo } from "./Cisco";
import { DropDownAvatar } from "./Avatar";
import { UserContext } from "../Providers/User.provider";

const defaultProps = {
    route: {
        path: "/",
        routes: [
            {
                path: "/Home",
                name: "Home",
                icon: <SmileOutlined />,
                component: "./Welcome",
            },
        ],
    },
    location: {
        pathname: "/",
    },
    title: "WebRTC Demo",
    logo: () => <CiscoLogo />,
    navTheme: "light",
    layout: "top",
    contentWidth: "Fixed",
    fixedHeader: true,
    fixSiderbar: false,
    headerHeight: 48,
    primaryColor: "#1890ff",
    splitMenus: false,
    footerRender: () => (
        <DefaultFooter links={null} copyright="2021 Created by Lukezzz" />
    ),
};

export const MainLayout = ({ children }) => {
    const { user } = useContext(UserContext);
    return (
        <div style={{ height: "100vh" }}>
            <ProLayout
                {...defaultProps}
                rightContentRender={() =>
                    user ? (
                        <Space>
                            <DropDownAvatar />
                        </Space>
                    ) : null
                }
            >
                {children}
            </ProLayout>
        </div>
    );
};
