import { useState } from "react";
import profileImage from "../images/profile.png"
import { userProfileStyles } from "../styles/userProfileStyles";
import { UserSettings } from "./UserSettings";

export const UserProfile = ({ userObject, logoutProp, window }) => {

    const [userDeploy, setUserDeploy] = useState(false);
    const [userSettingsDeploy, setUserSettingsDeploy] = useState(false);

    return (
        <div style={window.width > 200 ? userProfileStyles.userProfileStyle : userProfileStyles.hiddenUserProfileStyle}>
            <a href="javascript:void(0)" onClick={() => setUserDeploy(!userDeploy)} style={userProfileStyles.imageAnchor} ><img style={userProfileStyles.imageStyle} src={profileImage} alt="Profile Picture" /></a>
            {userDeploy &&
                <>
                    <br />
                    <h6 style={userProfileStyles.usernameStyle} >{userObject.username}</h6>
                    <h6 style={userProfileStyles.nameStyle} >{userObject.name} {userObject.lastname}</h6>
                    <a href="javascript:void(0)" style={userProfileStyles.buttonStyle} onClick={() => setUserSettingsDeploy(!userSettingsDeploy)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M14.5 23q-.625 0-1.063-.438T13 21.5v-7q0-.625.438-1.063T14.5 13h7q.625 0 1.063.438T23 14.5v7q0 .625-.438 1.063T21.5 23h-7Zm0-1.5h7v-.8q-.625-.775-1.525-1.238T18 19q-1.075 0-1.975.463T14.5 20.7v.8ZM18 18q.625 0 1.063-.438T19.5 16.5q0-.625-.438-1.063T18 15q-.625 0-1.063.438T16.5 16.5q0 .625.438 1.063T18 18Zm-8.75 4l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75L19.925 11H15.4q-.35-1.075-1.25-1.788t-2.1-.712q-1.45 0-2.475 1.025T8.55 12q0 1.2.675 2.1T11 15.35V22H9.25Z"
                            />
                        </svg>
                        &nbsp;
                        Settings
                    </a>
                    <a href="javascript:void(0)" style={userProfileStyles.buttonStyle} onClick={logoutProp}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <g fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121C20.617 2 19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121Z"
                                />
                            </g>
                        </svg>
                        &nbsp;
                        Log Out
                    </a>
                    {userSettingsDeploy &&
                        <UserSettings 
                            user={userObject}
                        />
                    }
                </>
            }
        </div>
    );
};