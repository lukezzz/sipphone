import { useContext } from "react";
import { Login } from "./Components/Login";
import { Phone } from "./Components/Phone";
import { MainLayout } from "./Components/Layout";
import { UserContext } from "./Providers/User.provider";
import Main from "./Containers/index";
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
        <Phone>
            <MainLayout>
                <Main />
            </MainLayout>
            ;
        </Phone>
    );
};

export default App;
