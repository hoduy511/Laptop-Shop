import React from "react";

const UserContext = React.createContext({email: '', auth:false});

const UserProvider = ({children}) => {
    const [user, setUser] = React.useState({email: '', auth: false});

    const loginContext = (email, token) =>{
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);
        setUser((user)=>({
            email: email,
            auth: true,
        }));
    };

    const logout = () =>{
        localStorage.clear();
        setUser((user) =>({
            email: '',
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