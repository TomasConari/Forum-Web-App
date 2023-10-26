import { useEffect, useState } from "react";
import { FormToEdit } from "./FormToEdit";
import { Comment } from "./Comments";
import { Delete } from "./Delete";
import { FormToCreate } from "./FormToCreate";
import profileImage from "../images/profile.png"

export const Post = ({ hostProp, headerProp, localUser, id, user, title, text, postReCall }) => {

    const [formDeploy, setFormDeploy] = useState(false);
    const [deleteDeploy, setDeleteDeploy] = useState(false);
    const [commentDeploy, setCommentDeploy] = useState(false);
    const [createCommentDeploy, setCreateCommentDeploy] = useState(false);
    const [postMessage, setPostMessage] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [allCommentMessage, setAllCommentMessage] = useState("");

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

    useEffect(() => {
        allCommentsCall();
    }, []);

    return(
        <div>
            <h2><img style={{width: "25px", height: "25px", marginTop: "5px", borderRadius: "5px"}} src={profileImage} alt={`${user}'s Profile Picture`} />  {user}</h2>
            <h3>{title}</h3>
            <p>{text}</p>
            {((user === localUser.username) || (localUser.role === "admin")) &&
                <div>
                    <button
                        onClick={() => {
                            setDeleteDeploy(!deleteDeploy);
                            setCommentDeploy(false);
                            setFormDeploy(false);
                        }}>Delete Post
                    </button>
                    {user === localUser.username && 
                        <button 
                            onClick={() => {
                                setFormDeploy(!formDeploy);
                                setCommentDeploy(false);
                                setDeleteDeploy(false);
                            }}>Edit
                        </button>}
                    {deleteDeploy && 
                        <Delete 
                            id={id}
                            eraseQuote="Post"
                            headerProp={headerProp}
                            hostProp={hostProp}
                            setDeleteDeployProp={setDeleteDeploy}
                            setMessageProp={setPostMessage}
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
                        />
                    }
                    {postMessage && <a id='error'><span /><span /><span /><span />{postMessage}</a>}
                </div>
            }
            <button 
                onClick={() => {
                    setCommentDeploy(!commentDeploy);
                    setFormDeploy(false);
                    setDeleteDeploy(false);
                }}>Comments
            </button>
            {commentDeploy && (
                <>
                    <button onClick={() => setCommentDeploy(false)}>X</button>
                    <p>{allCommentMessage}</p>
                    <button 
                        onClick={() => {
                            setCreateCommentDeploy(!createCommentDeploy);
                        }}>New Comment
                    </button>
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
                                />
                            </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <p>This Post Dont have any Comments</p>
                        </>
                    )}
                </>
            )}
            <br />
        </div>
    );
};