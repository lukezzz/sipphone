import { createContext, useState } from "react";

export const UserContext = createContext({
    user: {},
    userLogin: () => {},
    userLogout: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const userLogin = ({ username, password, sipUri }) => {
        setUser({
            username,
            password,
            sipUri,
        });
    };
    const userLogout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                userLogin,
                userLogout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
