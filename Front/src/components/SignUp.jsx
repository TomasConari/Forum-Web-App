import { useState } from "react";

export const SignUp = ({ hostProp, headerProp, errorProp, setLoginProp, loginProp}) => {

    const [signUser, setSignUser] = useState({
        name: "",
        lastname: "",
        username: "",
        password: ""
    });

    const setSignUp = (event) => {
        setSignUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value
        }));
    };

    const signUp = async () => {
        if(!signUser.name || !signUser.lastname || !signUser.username || !signUser.password){
            errorProp("Please Fill All Fields");
            setTimeout(() => errorProp(""), 6000);
            return;
        };
        if(signUser.password.length < 6){
            errorProp("Password Should Be At Least 6 Characters Long");
            setTimeout(() => errorProp(""), 6000);
            return;
        };
        try{
            const response = await fetch(`${hostProp}/user/create`, {
                method: 'POST',
                headers: headerProp,
                body: JSON.stringify(signUser)
            });
            try{
                if(response.status === 201){
                    setSignUser({
                        name: "",
                        lastname: "",
                        username: "",
                        password: ""
                    });
                    setLoginProp(!loginProp);
                    errorProp(`User Created, Please Log In`);
                    setTimeout(() => errorProp(""), 6000);
                };
            }catch(error){
                errorProp("User Created, Message Error");
                setTimeout(() => errorProp(""), 6000);
            };
        }catch(error){
            errorProp("An Error Occurred");
            setTimeout(() => errorProp(""), 6000);
        };
    };

    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            signUp();
        };
    };

    return(
        <>
            <div className="user-box">
                <input 
                    name="name" 
                    type="text" 
                    autoComplete="off"
                    value={signUser.name} 
                    onChange={setSignUp}
                    onKeyDown={handleKeyDown}
                />
                <label>Name</label>
            </div>
            <div className="user-box">
                <input
                    name="lastname"
                    type="text" 
                    autoComplete="off"
                    value={signUser.lastname} 
                    onChange={setSignUp}
                    onKeyDown={handleKeyDown}
                />
                <label>Lastname</label>
            </div>
            <div className="user-box">
                <input 
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={signUser.username} 
                    onChange={setSignUp}
                    onKeyDown={handleKeyDown}
                />
                <label>Username</label>
            </div>
            <div className="user-box">
                <input 
                    name="password"
                    type="password" 
                    value={signUser.password} 
                    onChange={setSignUp}
                    onKeyDown={handleKeyDown}
                />
                <label>Password</label>
            </div>
            <a href="#" onClick={signUp}>
                Register
            </a>
        </>
    );
};