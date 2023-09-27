import { useEffect, useState } from "react";
import { Post } from "./post";

export const Dashboard = ({ host, header }) => {

    //States

    const [postResponse, setPostResponse] = useState("");
    const [allPosts, setallPosts] = useState([]);
    const [post, setPost] = useState({
        title: "",
        text: ""
    });

    //Functions

    const savePostForm = (type, event) => {
        const quote = event.target.value;
        setPost((prevPost) => ({
          ...prevPost,
          [type]: quote
        }));
    };

    const createPost = async () => {
        try{
            if((post.title.length > 0) && (post.text.length > 0)){
                const response = await fetch(`${host}/post/create`, {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(post)
                });
                allPostsCall();
                setPostResponse("Post Created Succesfully");
                setTimeout(() => setPostResponse(""), 4000);
            }else{
                setPostResponse("Both Forms must be filled");
                setTimeout(() => setPostResponse(""), 4000);
            };
        }catch(error){
            console.error(error);
        };
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
        };
    };

    useEffect(() => {
        allPostsCall();
    }, []);

    if(allPosts.length > 0){
        return(
        <div>
            <div>
                <h1>Create Post</h1>
                <input type="text" placeholder="Tittle" onChange={(event) => savePostForm('title', event)} />
                <input type="text" placeholder="Text" onChange={(event) => savePostForm('text', event)} />
                <button onClick={createPost}>Post It</button>
                {postResponse && <p>{postResponse}</p>}
            </div>
            <br />
            <div>
                {allPosts.map((el) => (
                <Post key={el["_id"]} title={el.title} text={el.text} user={el.user} />
                ))}
            </div>
        </div>
        );
    }else{
        return(
            <div>
                <h2>No Posts available</h2>
                <h1>Create Post</h1>
                <input type="text" placeholder="Tittle" onChange={(event) => savePostForm('title', event)} />
                <input type="text" placeholder="Text" onChange={(event) => savePostForm('text', event)} />
                <button onClick={createPost}>Post It</button>
                {postResponse && <p>{postResponse}</p>}
            </div>
        );
    };
};
