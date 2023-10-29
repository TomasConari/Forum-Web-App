import { useState } from "react";
import jwt_decode from "jwt-decode";

export const LoginComponent = ({ setUserInfoProp, hostProp, headerProp, setHeaderProp, authProp, errorProp }) => {

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const setUserAndPassword = (event) => {
        setUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value
        }));
    };

    const login = async () => {
        if(!(!user.username || !user.password)){
            try{
                const response = await fetch(`${hostProp}/user/login`, {
                    method: "POST",
                    headers: headerProp,
                    body: JSON.stringify(user)
                });
                if(response.status === 200){
                    const responseJson = await response.json();
                    setHeaderProp((prevHeader) => ({
                        ...prevHeader,
                        "auth-token": responseJson.token
                    }));
                    setUser((prevUser) => {
                        const newUser = { ...prevUser };
                        newUser.password = "";
                        return newUser;
                    });
                    authProp(true);
                    localStorage.setItem("auth-token", responseJson.token);
                    setUserInfoProp(jwt_decode(responseJson.token));
                }else if(response.status === 401){
                    setUser((prevUser) => {
                        const newUser = { ...prevUser };
                        newUser.password = "";
                        return newUser;
                    });
                    errorProp("Incorrect username or password");
                    setTimeout(() => errorProp(""), 5000);
                    return;
                }else{
                    errorProp("An error occurred, please try again later");
                    setTimeout(() => errorProp(""), 5000);
                    return;
                };
            }catch(error){
                errorProp("An error occurred connecting to the database, please try again later");
                setTimeout(() => errorProp(""), 6000);
            };
        }else{
            errorProp("Both Forms Must Be Filled");
            setTimeout(() => errorProp(""), 6000);
            return;
        };
    };

    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            login();
        };
    };

    return (
        <>
            <div className="user-box">
                <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    onChange={setUserAndPassword}
                    onKeyDown={handleKeyDown}
                />
                <label>Username</label>
            </div>
            <div className="user-box">
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={setUserAndPassword}
                    onKeyDown={handleKeyDown}
                />
                <label>Password</label>
            </div>
            <a href="javascript:void(0)" onClick={login}>
                Login
            </a>
        </>
    );
};