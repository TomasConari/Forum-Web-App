import { useState } from "react";
import profileImage from "../images/profile.png"
import { userProfileStyles } from "../styles/userProfileStyles";

export const UserProfile = ({ userObject, logoutProp, window }) => {

    const [userDeploy, setUserDeploy] = useState(false);

    return(
        <div style={window.width > 200 ? userProfileStyles.userProfileStyle : userProfileStyles.hiddenUserProfileStyle}>
            <a href="#" onClick={() => setUserDeploy(!userDeploy)} style={userProfileStyles.imageAnchor} ><img style={userProfileStyles.imageStyle} src={profileImage} alt="Profile Picture" /></a>
            {userDeploy &&
                <>
                    <h6 style={userProfileStyles.usernameStyle} >{userObject.username}</h6>
                    <h6 style={userProfileStyles.nameStyle} >{userObject.name} {userObject.lastname}</h6>
                    <a href="#" style={userProfileStyles.buttonStyle} onClick={logoutProp}>Settings</a>
                    <a href="#" style={userProfileStyles.buttonStyle} onClick={logoutProp}>Log out</a>
                </>
            }
        </div>
    );
};