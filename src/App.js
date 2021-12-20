import { useContext } from "react";
import { Login } from "./Components/Login";
import SIPProvider from "./Providers/SIP.provider";
import { MainLayout } from "./Components/Layout";
import { UserContext } from "./Providers/User.provider";
import Main from "./Containers/index2";
import { notification } from "antd";

import "./App.less";

notification.config({
    maxCount: 1,
});

const App = () => {
    const { user } = useContext(UserContext);
    if (!user) {
        return (
            <MainLayout>
                <Login />
            </MainLayout>
        );
    }

    return (
        <SIPProvider user={user}>
            <MainLayout>
                <Main />
            </MainLayout>
        </SIPProvider>
    );
};

export default App;
