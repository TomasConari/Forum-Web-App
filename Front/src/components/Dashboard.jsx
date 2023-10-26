import { useEffect, useState } from "react";
import { Post } from "./Post";
import { FormToCreate } from "./FormToCreate";
import { dashboardStyles } from "../styles/dashboardStyles";

export const Dashboard = ({ host, header, localUser, window }) => {

    const [postResponse, setPostResponse] = useState("");
    const [createPostDeploy, setCreatePostDeploy] = useState(false);
    const [allPostsOrder, setAllPostsOrder] = useState(false);
    const [allPosts, setallPosts] = useState([]);

    let callError = "no Error";

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
            callError = "No Connection";
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

    if(allPosts.length > 0){
        return(
            <>
                <div style={dashboardStyles.header}><h1 style={ window.width > 200 ? dashboardStyles.title : dashboardStyles.hiddenTitle }>Forum</h1></div>
                    <div style={dashboardStyles.dashboard}>
                    <button onClick={() => setCreatePostDeploy(!createPostDeploy)}>New Post</button>
                    <button onClick={invertPostsOrder}>{allPostsOrder? "Showing Oldest Posts First" : "Showing Newest Posts First"}</button>
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
                    {postResponse && <p>{postResponse}</p>}
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
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    }else if(callError = "No Connection"){
        return(
            <div>
                <h1>No Internet Connection, Try Again Later</h1>
            </div>
        );
    }else{
        return(
            <div>
                {!createPostDeploy && <button onClick={() => setCreatePostDeploy(!createPostDeploy)}>New Post</button>}
                <button onClick={invertPostsOrder}>{allPostsOrder? "Showing Oldest Posts First" : "Showing Newest Posts First"}</button>
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
                {postResponse && <p>{postResponse}</p>}
            </div>
        );
    };
};
