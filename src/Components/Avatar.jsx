import { Avatar, Dropdown, Menu } from "antd";
import { useContext } from "react";
import { UserContext } from "../Providers/User.provider";
import { LoginOutlined } from "@ant-design/icons";
import * as PropTypes from "prop-types";

export const DropDownAvatar = (props, context) => {
    const { user, userLogout } = useContext(UserContext);
    const { unregisterSip } = context;
    const signOut = () => {
        // unregisterSip();
        userLogout();
    };

    const AvatarMenu = () => {
        return (
            <Menu selectedKeys={[]}>
                <Menu.Item key="signout" onClick={signOut}>
                    <LoginOutlined />
                    Logout
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <Dropdown overlay={AvatarMenu} trigger={["click"]}>
            <Avatar
                style={{
                    // backgroundColor: "black",
                    verticalAlign: "middle",
                }}
            >
                <div>{user.username}</div>
            </Avatar>
        </Dropdown>
    );
};

DropDownAvatar.contextTypes = {
    unregisterSip: PropTypes.func,
};
