import { useEffect, useState } from "react";
import { Delete } from "./Delete";
import { FormToEdit } from "./FormToEdit";
import { commentStyles } from "../styles/commentStyles";
import profileImage from "../images/profile.png";

export const Comment = ({ id, localUser, user, title, text, headerProp, hostProp, reCallComments, setAllMessages, created }) => {

    const [deleteCommentDeploy, setDeleteCommentDeploy] = useState(false);
    const [commentFormDeploy, setCommentFormDeploy] = useState(false);
    const [timeAgo, setTimeAgo] = useState("");
    const [commentOptionsDeploy, setCommentcommentOptionsDeploy] = useState(false);

    const calculateTimeAgo = () => {
        const currentDate = new Date();
        const postTimestamp = new Date(created).getTime();
        const currentTimestamp = currentDate.getTime();
        const timeDifference = currentTimestamp - postTimestamp;
        let timeAgoString = "";
        if(timeDifference < 60000){
            timeAgoString = "Just now";
        }else if (timeDifference < 3600000){
            const minutes = Math.floor(timeDifference / 60000);
            timeAgoString = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        }else if(timeDifference < 86400000){
            const hours = Math.floor(timeDifference / 3600000);
            timeAgoString = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        }else{
            const days = Math.floor(timeDifference / 86400000);
            timeAgoString = `${days} ${days === 1 ? "day" : "days"} ago`;
        };
        setTimeAgo(timeAgoString);
    };
    useEffect(() => {
        calculateTimeAgo();
    }, []);

    return(
        <div>
            <div style={commentStyles.comment} id={id}>
                <p style={commentStyles.white}>
                    <strong>
                        <div style={commentStyles.strong}>
                            <img
                                style={commentStyles.imageStyle}
                                src={profileImage}
                                alt={`${user}"s Profile Picture`}
                            />
                            <div style={commentStyles.user}>
                                <p style={{ ...commentStyles.userTitle, fontSize: "1.8em" }}>{user}</p>
                                <p style={commentStyles.userTitle}>{timeAgo}</p>
                            </div>
                            {(user === localUser.username || localUser.role === "admin") && (
                                <div style={{ marginLeft: "auto" }}>
                                    <div>
                                        <a
                                            style={commentStyles.whiteButtonStyle}
                                            href="javascript:void(0)"
                                            onClick={() => setCommentcommentOptionsDeploy(!commentOptionsDeploy)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 1024 1024"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M176 416a112 112 0 1 1 0 224a112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224a112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224a112 112 0 0 1 0-224z"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                    {commentOptionsDeploy && (
                                        <div style={commentStyles.commentOptionsDeploy}>
                                            <ul style={commentStyles.ul}>
                                                <li>
                                                    <a
                                                        style={commentStyles.blackButtonStyle}
                                                        href="javascript:void(0)"
                                                        onClick={() => {
                                                            setDeleteCommentDeploy(!deleteCommentDeploy);
                                                            setCommentFormDeploy(false);
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="1em"
                                                            height="1em"
                                                            viewBox="0 0 256 256">
                                                            <path
                                                                fill="currentColor"
                                                                d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM112 168a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm0-120H96v-8a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8Z"
                                                            />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <br />
                                                <li>
                                                    {user === localUser.username && (
                                                        <a
                                                            style={commentStyles.blackButtonStyle}
                                                            href="javascript:void(0)"
                                                            onClick={() => {
                                                                setCommentFormDeploy(!commentFormDeploy);
                                                                setDeleteCommentDeploy(false);
                                                            }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                                                                />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                    {deleteCommentDeploy && (
                                        <Delete
                                            id={id}
                                            eraseQuote="Comment"
                                            headerProp={headerProp}
                                            hostProp={hostProp}
                                            reCall={reCallComments}
                                            setDeleteDeployProp={setDeleteCommentDeploy}
                                            setMessageProp={setAllMessages}
                                        />
                                    )}
                                    {commentFormDeploy && (
                                        <FormToEdit
                                            headerProp={headerProp}
                                            hostProp={hostProp}
                                            id={id}
                                            user={user}
                                            editQuote="Comment"
                                            setMessageProp={setAllMessages}
                                            reCall={reCallComments}
                                            setFormDeployProp={setCommentFormDeploy}
                                            prevText={text}
                                            prevTitle={title}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        <br />
                        {title}:
                    </strong>
                    <br />
                    {text}
                    <br />
                    <br />
                </p>
            </div>
            <br />
        </div>
    );
};