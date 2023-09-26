import { useState } from "react";

export const LoginComponent  = ({ hostProp, headerProp, setHeaderProp, authProp, errorProp }) => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const setUserAndPassword = (type, event) => {
        const word = event.target.value;
        setUser((prevUser) => ({
            ...prevUser,
            [type]: word
        }));
    };

    const login = async () => {
        try {
            const response = await fetch(`${hostProp}/user/login`, {
                method: 'POST',
                headers: headerProp,
                body: JSON.stringify(user)
            });
            if (response.status === 200) {
                const responseJson = await response.json();
                setHeaderProp((prevHeader) => ({
                    ...prevHeader,
                    'auth-token': responseJson.token
                }));
                setUser((prevUser) => {
                    const newUser = { ...prevUser };
                    newUser.password = "";
                    return newUser;
                });
                authProp(true);
                localStorage.setItem('auth-token', responseJson.token);
            } else if (response.status === 401) {
                setUser((prevUser) => {
                    const newUser = { ...prevUser };
                    newUser.password = "";
                    return newUser;
                });
                errorProp("Incorrect username or password");
                setTimeout(() => errorProp(""), 6000);
            } else {
                errorProp("An error occurred, please try again later");
                setTimeout(() => errorProp(""), 6000);
            };
        }catch(error) {
            errorProp("An error occurred connecting to the database, please try again later");
            setTimeout(() => errorProp(""), 8000);
        };
    };

    return(
        <>
            <div className="user-box">
                <input 
                    type="text" 
                    onChange={(event) => setUserAndPassword('username', event)} 
                />
                <label>Username</label>
            </div>
            <div className="user-box">
                <input 
                    type="password" 
                    value={user.password} 
                    onChange={(event) => setUserAndPassword('password', event)} 
                />
                <label>Password</label>
            </div>
            <a href="#" onClick={login}>
                Login
            </a>
        </>
    );
};