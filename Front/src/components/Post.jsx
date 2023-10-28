import { useEffect, useState } from "react";
import { FormToEdit } from "./FormToEdit";
import { Comment } from "./Comments";
import { Delete } from "./Delete";
import { FormToCreate } from "./FormToCreate";
import profileImage from "../images/profile.png";
import { postStyles } from "../styles/postStyles";
import { commentIcon } from "../styles/postStyles";

export const Post = ({ hostProp, headerProp, localUser, id, user, title, text, created, postReCall, setAllPostsMessage }) => {

    const [formDeploy, setFormDeploy] = useState(false);
    const [deleteDeploy, setDeleteDeploy] = useState(false);
    const [commentDeploy, setCommentDeploy] = useState(false);
    const [createCommentDeploy, setCreateCommentDeploy] = useState(false);
    const [postMessage, setPostMessage] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [allCommentMessage, setAllCommentMessage] = useState("");
    const [timeAgo, setTimeAgo] = useState("");
    const [optionsDeploy, setOptionsDeploy] = useState(false);

    const allCommentsCall = async () => {
        try{
            const rawData = await fetch(`${hostProp}/comments/from/${id}`, {
                method: "GET",
                headers: headerProp
            });
            const dataJson = await rawData.json();
            const dataArr = dataJson.data;
            setAllComments(dataArr.reverse());
        }catch(error){
            setAllCommentMessage("There was an error getting the Comments");
            setTimeout(() => setAllCommentMessage(""), 6000);
        };
    };

    const calculateTimeAgo = () => {
        const currentDate = new Date();
        const postTimestamp = new Date(created).getTime();
        const currentTimestamp = currentDate.getTime();
        const timeDifference = currentTimestamp - postTimestamp;
        let timeAgoString = "";
        if (timeDifference < 60000) {
            timeAgoString = "Just now";
        } else if (timeDifference < 3600000) {
            const minutes = Math.floor(timeDifference / 60000);
            timeAgoString = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        } else if (timeDifference < 86400000) {
            const hours = Math.floor(timeDifference / 3600000);
            timeAgoString = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        } else {
            const days = Math.floor(timeDifference / 86400000);
            timeAgoString = `${days} ${days === 1 ? "day" : "days"} ago`;
        };
        setTimeAgo(timeAgoString);
    };

    useEffect(() => {
        allCommentsCall();
        calculateTimeAgo();
    }, []);

    return(
        <div>
            <div style={postStyles.post}>
                <p style={postStyles.white}>
                    <strong>
                        <div style={postStyles.strong}>
                            <img
                                style={postStyles.imageStyle}
                                src={profileImage}
                                alt={`${user}"s Profile Picture`}
                            />
                            <div style={postStyles.user}>
                                <p style={{ ...postStyles.userTitle, fontSize: "1.8em" }}>{user}</p>
                                <p style={postStyles.userTitle}>{timeAgo}</p>
                            </div>
                            {((user === localUser.username) || (localUser.role === "admin")) &&
                                <div style={{ marginLeft: "auto" }}>
                                    <div>
                                        <a style={postStyles.whiteButtonStyle} href="javascript:void(0)" onClick={() => setOptionsDeploy(!optionsDeploy)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 1024 1024">
                                                <path
                                                    fill="currentColor"
                                                    d="M176 416a112 112 0 1 1 0 224a112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224a112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224a112 112 0 0 1 0-224z"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                    {optionsDeploy &&
                                        <div style={postStyles.optionsDeploy}>
                                            <ul style={postStyles.ul}>
                                                <li>
                                                    <a
                                                        style={postStyles.blueButtonStyle}
                                                        href="javascript:void(0)"
                                                        onClick={() => {
                                                            setDeleteDeploy(!deleteDeploy);
                                                            setFormDeploy(false);
                                                        }}>
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
                                                    {user === localUser.username &&
                                                        <a
                                                            style={postStyles.blueButtonStyle}
                                                            href="javascript:void(0)"
                                                            onClick={() => {
                                                                setFormDeploy(!formDeploy);
                                                                setDeleteDeploy(false);
                                                            }}>
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
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                    }
                                    {deleteDeploy &&
                                        <Delete
                                            id={id}
                                            eraseQuote="Post"
                                            headerProp={headerProp}
                                            hostProp={hostProp}
                                            setDeleteDeployProp={setDeleteDeploy}
                                            setMessageProp={setAllPostsMessage}
                                            reCall={postReCall}
                                        />
                                    }
                                    {formDeploy &&
                                        <FormToEdit
                                            headerProp={headerProp}
                                            hostProp={hostProp}
                                            id={id}
                                            user={user}
                                            eraseQuote={"Post"}
                                            setMessageProp={setPostMessage}
                                            reCall={postReCall}
                                            setFormDeployProp={setFormDeploy}
                                            prevTitle={title}
                                            prevText={text}
                                        />
                                    }
                                    {postMessage && <h3 style={postStyles.white}>{postMessage}</h3>}
                                </div>
                            }
                        </div>
                        <br />
                        {title}:
                    </strong>
                    <br />
                    {text}
                    <br />
                    <br />
                    <a
                        style={postStyles.whiteButtonStyle}
                        href="javascript:void(0)"
                        onClick={() => {
                            setCommentDeploy(!commentDeploy);
                        }}>
                        {commentDeploy ? commentIcon.showingComments : commentIcon.hiddinComments}
                    </a>
                </p>
                {commentDeploy && (
                    <div style={postStyles.commentsSection}>
                        <a
                            style={postStyles.whiteButtonStyle}
                            href="javascript:void(0)"
                            onClick={() => {
                                setCreateCommentDeploy(!createCommentDeploy);
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-3 9h-4v4h-2v-4H7V9h4V5h2v4h4v2z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                        <h3 style={postStyles.message}>{allCommentMessage}</h3>
                        {createCommentDeploy &&
                            <FormToCreate
                                id={id}
                                createQuote="Comment"
                                hostProp={hostProp}
                                localUsername={user}
                                headerProp={headerProp}
                                reCall={allCommentsCall}
                                setMessageProp={setAllCommentMessage}
                                setDeploy={setCreateCommentDeploy}
                            />
                        }
                        {allComments.length > 0 ? (
                            <>
                                {allComments.map((el) => (
                                    <div key={el._id}>
                                        <Comment
                                            id={el._id}
                                            user={el.user}
                                            title={el.title}
                                            text={el.text}
                                            localUser={localUser}
                                            headerProp={headerProp}
                                            hostProp={hostProp}
                                            reCallComments={allCommentsCall}
                                            setAllMessages={setAllCommentMessage}
                                            created={el.createdAt}
                                        />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <h2 style={postStyles.white} >This Post Dont have any Comments</h2>
                            </>
                        )}
                    </div>
                )}
            </div>
            <br />
        </div>
    );
};