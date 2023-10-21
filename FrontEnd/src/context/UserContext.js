import React from "react";

const UserContext = React.createContext({user: '', auth:false});

const UserProvider = ({children}) => {
    const [user, setUser] = React.useState({user: '', auth: false});

    const loginContext = (user, access, refresh) =>{
        setUser((user)=>({
            user: user,
            auth: true,
        }));
    };

    const logout = () =>{
        localStorage.clear();
        setUser((user) =>({
            user: '',
            auth:false
        }));

    }

    return (
        <UserContext.Provider value={{user, loginContext, logout}}>
            {children}
        </UserContext.Provider>
    )
};

export {UserContext, UserProvider};