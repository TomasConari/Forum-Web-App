import { useState } from "react";

export const SignUp = ({ hostProp, headerProp, errorProp, setLoginProp, loginProp}) => {

    const [signUser, setSignUser] = useState({
        name: '',
        lastname: '',
        username: '',
        password: ''
    });

    const setSignUp = (type, event) => {
        const word = event.target.value;
        setSignUser((prevUser) => ({
            ...prevUser,
            [type]: word
        }));
    };

    const signUp = async () => {
        if (!signUser.name || !signUser.lastname || !signUser.username || !signUser.password) {
            errorProp("Please fill in all fields");
            setTimeout(() => errorProp(""), 6000);
            return;
        };
        if (signUser.password.length < 6) {
            errorProp("Password should be at least 6 characters long");
            setTimeout(() => errorProp(""), 6000);
            return;
        };
        try {
            const response = await fetch(`${hostProp}/user/create`, {
                method: 'POST',
                headers: headerProp,
                body: JSON.stringify(signUser)
            });
            try {
                if(response.status === 201) {
                    setSignUser({
                        name: '',
                        lastname: '',
                        username: '',
                        password: ''
                    });
                    setLoginProp(!loginProp);
                    errorProp(`User created, please Log In`);
                    setTimeout(() => errorProp(""), 6000);
                };
            } catch (error) {
                errorProp("User Created, message error");
                setTimeout(() => errorProp(""), 6000);
            };
        } catch (error) {
            errorProp("An error occurred");
            setTimeout(() => errorProp(""), 6000);
        };
    };

    return(
        <>
            <div className="user-box">
                <input input type="text" value={signUser.name} onChange={(event) => setSignUp('name', event)} />
                <label>Name</label>
            </div>
            <div className="user-box">
                <input input type="text" value={signUser.lastname} onChange={(event) => setSignUp('lastname', event)} />
                <label>Lastname</label>
            </div>
            <div className="user-box">
                <input input type="text" value={signUser.username} onChange={(event) => setSignUp('username', event)} />
                <label>Username</label>
            </div>
            <div className="user-box">
                <input input type="password" value={signUser.password} onChange={(event) => setSignUp('password', event)} />
                <label>Password</label>
            </div>
            <a href="#" onClick={signUp}>
                Register
            </a>
        </>
    );
};