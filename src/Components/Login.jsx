import { LoginForm, ProFormText, ProFormCheckbox } from "@ant-design/pro-form";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { UserContext } from "../Providers/User.provider";

export const Login = () => {
    const { userLogin } = useContext(UserContext);

    return (
        <div style={{ backgroundColor: "white" }}>
            <LoginForm
                title="WebRTC Demo"
                subTitle="SIP Client"
                onFinish={(values) => userLogin(values)}
                initialValues={{
                    sipUri: "fsd.analystock.com",
                }}
            >
                <>
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: "large",
                            prefix: <UserOutlined className={"prefixIcon"} />,
                        }}
                        placeholder={"用户名: admin or user"}
                        rules={[
                            {
                                required: true,
                                message: "请输入用户名!",
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: "large",
                            prefix: <LockOutlined className={"prefixIcon"} />,
                        }}
                        placeholder={"密码: ant.design"}
                        rules={[
                            {
                                required: true,
                                message: "请输入密码！",
                            },
                        ]}
                    />
                    <ProFormText
                        name="sipUri"
                        fieldProps={{
                            size: "large",
                        }}
                        placeholder={"SIP: IP or Domain"}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    />
                </>
                <div
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: "right",
                        }}
                    >
                        忘记密码
                    </a>
                </div>
            </LoginForm>
        </div>
    );
};
