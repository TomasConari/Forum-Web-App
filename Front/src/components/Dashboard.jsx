import { useEffect, useState } from "react";
import { Post } from "./Post";
import { FormToCreate } from "./FormToCreate";
import { dashboardStyles } from "../styles/dashboardStyles";

export const Dashboard = ({ host, header, localUser, window }) => {

    const [postResponse, setPostResponse] = useState("");
    const [createPostDeploy, setCreatePostDeploy] = useState(false);
    const [allPostsOrder, setAllPostsOrder] = useState(false);
    const [allPosts, setallPosts] = useState([]);
    const [callError, setCallError] = useState("");

    const postsOrderIcon = {
        oldToNew: 
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="1em" 
                height="1em" 
                viewBox="0 0 24 24">
                <path 
                    fill="currentColor" 
                    fillRule="evenodd" 
                    d="M2.25 6A.75.75 0 0 1 3 5.25h17a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 6Zm0 5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm0 5a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm14.72 1.53a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06l-1.22 1.22V9a.75.75 0 0 0-1.5 0v6.19l-1.22-1.22a.75.75 0 1 0-1.06 1.06l2.5 2.5Z" 
                    clipRule="evenodd"
                />
            </svg>,
        newToOld:
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="1em" 
                height="1em" 
                viewBox="0 0 24 24">
                <path 
                    fill="currentColor" 
                    fillRule="evenodd"
                    d="M2.25 6A.75.75 0 0 1 3 5.25h17a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 6Zm14.72 2.47a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 1 1-1.06 1.06l-1.22-1.22V17a.75.75 0 0 1-1.5 0v-6.19l-1.22 1.22a.75.75 0 1 1-1.06-1.06l2.5-2.5ZM2.25 11a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm0 5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z" 
                    clipRule="evenodd"
                />
            </svg>,
    };

    const allPostsCall = async () => {
        try{
            const rawData = await fetch(`${host}/posts`, {
                method: "GET",
                headers: header
            });
            const dataJson = await rawData.json();
            const dataArr = dataJson.data;
            setallPosts(dataArr.reverse());
        }catch(error){
            console.error("Error fetching Posts:", error);
            setCallError("No Connection")
        };
    };

    const invertPostsOrder = () => {
        if(allPosts.length > 0){
            setallPosts((prevPosts) => {
                const reversedPosts = [...prevPosts].reverse();
                return reversedPosts;
            });
            setAllPostsOrder(!allPostsOrder);
        };
    };

    useEffect(() => {
        allPostsCall();
    }, []);

    if(callError === "No Connection"){
        return(
            <>
                <div style={dashboardStyles.header}>
                    <h1 style={ window.width > 200 ? dashboardStyles.title : dashboardStyles.hiddenTitle }>
                        Forum
                    </h1>
                </div>
                <div style={dashboardStyles.dashboard}>
                    <h1 style={{...dashboardStyles.title, marginLeft: "0px"}}>Connection Lost, Try: <br />
                        <h5>
                            -Check Your Internet Connection.<br />
                            -Reload The Page.<br />
                            -Log in Again.<br />
                            -Try Again Later.
                        </h5>
                    </h1>
                </div>
            </>
        );
    }else if(allPosts.length > 0){
        return(
            <>
                <div style={dashboardStyles.header}><h1 style={ window.width > 200 ? dashboardStyles.title : dashboardStyles.hiddenTitle }>Forum</h1></div>
                    <div style={dashboardStyles.dashboard}>
                        <a 
                            style={dashboardStyles.whiteButtonStyle} 
                            href="javascript:void(0)" 
                            onClick={() => setCreatePostDeploy(!createPostDeploy)}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="1em" 
                                height="1em" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    fill="currentColor" 
                                    d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8q.425 0 .713.288T14 4q0 .425-.288.713T13 5H5v14h14v-8q0-.425.288-.713T20 10q.425 0 .713.288T21 11v8q0 .825-.588 1.413T19 21H5Zm4-4q-.425 0-.713-.288T8 16q0-.425.288-.713T9 15h6q.425 0 .713.288T16 16q0 .425-.288.713T15 17H9Zm0-3q-.425 0-.713-.288T8 13q0-.425.288-.713T9 12h6q.425 0 .713.288T16 13q0 .425-.288.713T15 14H9Zm0-3q-.425 0-.713-.288T8 10q0-.425.288-.713T9 9h6q.425 0 .713.288T16 10q0 .425-.288.713T15 11H9Zm9-2q-.425 0-.713-.288T17 8V7h-1q-.425 0-.713-.288T15 6q0-.425.288-.713T16 5h1V4q0-.425.288-.713T18 3q.425 0 .713.288T19 4v1h1q.425 0 .713.288T21 6q0 .425-.288.713T20 7h-1v1q0 .425-.288.713T18 9Z"
                                />
                            </svg>
                        </a>
                        {(allPosts.length > 1) && 
                            <a 
                                href="javascript:void(0)" 
                                style={dashboardStyles.whiteButtonStyle} 
                                onClick={invertPostsOrder}>{allPostsOrder? postsOrderIcon.newToOld : postsOrderIcon.oldToNew}
                            </a>}
                        {createPostDeploy && 
                            <FormToCreate 
                                createQuote="Post"
                                hostProp={host}
                                localUsername={localUser.username}
                                headerProp={header}
                                reCall={allPostsCall}
                                setMessageProp={setPostResponse}
                                setDeploy={setCreatePostDeploy}
                            />
                        }
                        {postResponse && <h1 style={{...dashboardStyles.title, marginLeft: "0px"}}>{postResponse}</h1>}
                        <br />
                        <div>
                            {allPosts.map((el) => (
                                <Post 
                                    hostProp={host} 
                                    headerProp={header} 
                                    localUser={localUser} 
                                    user={el.user} 
                                    title={el.title} 
                                    text={el.text} 
                                    id={el["_id"]} 
                                    key={el["_id"]} 
                                    postReCall={allPostsCall}
                                    created={el.createdAt}
                                    setAllPostsMessage = {setPostResponse}
                                />
                            ))}
                    </div>
                </div>
            </>
        );
    }else{
        return(
            <>
                <div style={dashboardStyles.header}><h1 style={ window.width > 200 ? dashboardStyles.title : dashboardStyles.hiddenTitle }>Forum</h1></div>
                <div style={dashboardStyles.dashboard}>
                    <a 
                        style={dashboardStyles.whiteButtonStyle} 
                        href="javascript:void(0)" 
                        onClick={() => setCreatePostDeploy(!createPostDeploy)}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="1em" 
                            height="1em" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                fill="currentColor" 
                                d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8q.425 0 .713.288T14 4q0 .425-.288.713T13 5H5v14h14v-8q0-.425.288-.713T20 10q.425 0 .713.288T21 11v8q0 .825-.588 1.413T19 21H5Zm4-4q-.425 0-.713-.288T8 16q0-.425.288-.713T9 15h6q.425 0 .713.288T16 16q0 .425-.288.713T15 17H9Zm0-3q-.425 0-.713-.288T8 13q0-.425.288-.713T9 12h6q.425 0 .713.288T16 13q0 .425-.288.713T15 14H9Zm0-3q-.425 0-.713-.288T8 10q0-.425.288-.713T9 9h6q.425 0 .713.288T16 10q0 .425-.288.713T15 11H9Zm9-2q-.425 0-.713-.288T17 8V7h-1q-.425 0-.713-.288T15 6q0-.425.288-.713T16 5h1V4q0-.425.288-.713T18 3q.425 0 .713.288T19 4v1h1q.425 0 .713.288T21 6q0 .425-.288.713T20 7h-1v1q0 .425-.288.713T18 9Z"
                            />
                        </svg>
                    </a>
                    <h1 style={{...dashboardStyles.title, marginLeft: "0px"}}>There are no Posts</h1>
                    {createPostDeploy && 
                        <FormToCreate 
                            createQuote="Post"
                            hostProp={host}
                            localUsername={localUser.username}
                            headerProp={header}
                            reCall={allPostsCall}
                            setMessageProp={setPostResponse}
                            setDeploy={setCreatePostDeploy}
                        />
                    }
                    {postResponse && <h1 style={{...dashboardStyles.title, marginLeft: "0px"}}>{postResponse}</h1>}
                </div>
            </>
        );
    };
};
