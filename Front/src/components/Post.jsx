import { useState } from "react";
import { FormToEdit } from "./FormToEdit";

export const Post = ({ hostProp, headerProp, localUser, id, user, title, text, postReCall }) => {

    const [formDeploy, setFormDeploy] = useState(false);
    const [deleteDeploy, setDeleteDeploy] = useState(false);
    const [postMessage, setPostMessage] = useState("");
    const [updateBody, setUpdateBody] = useState({
        username: user,
        title: "",
        text: ""
    });

    const deletePost = async () => {
        try{
            const response = await fetch(`${hostProp}/post/delete/${id}`, {
                method: "DELETE",
                headers: headerProp
            });
            if(response.ok === false){
                throw new Error;
            }else{
                postReCall();
                setDeleteDeploy(false);
                setPostMessage(response.message);
                setTimeout(() => setPostMessage(""), 6000);
            };
        }catch(error){
            console.log(error)
            setPostMessage("Connection Error, Try Again Later");
            setTimeout(() => setPostMessage(""), 6000);
        };
    };

    const edit = async () => {
        try{
            if(updateBody.title.length < 1){
                setPostMessage("Title can not be Empty");
                setTimeout(() => setPostMessage(""), 6000);
                return;
            };
            if(updateBody.text.length < 1){
                setPostMessage("Text can not be Empty");
                setTimeout(() => setPostMessage(""), 6000);
                return;
            };
            const response = await fetch(`${hostProp}/post/update/${id}`, {
                method: "PUT",
                headers: headerProp,
                body: JSON.stringify(updateBody)
            });
            if(response.ok === false){
                setPostMessage(response.message);
                setTimeout(() => setPostMessage(""), 6000);
            }else{
                setUpdateBody((prevBody) => ({
                    ...prevBody,
                    title: "",
                    text: ""
                }));
                postReCall();
                setFormDeploy(false);
                setPostMessage(response.message);
                setTimeout(() => setPostMessage(""), 6000);
            };
        }catch(error){
            console.log(error)
            setPostMessage("Connection Error, Try Again Later");
            setTimeout(() => setPostMessage(""), 6000);
        };
    };

    return (
        <div id={id}>
            <h2>{user}</h2>
            <h3>{title}</h3>
            <p>{text}</p>
            {((user === localUser.username) || (localUser.role === "admin")) &&
                <div>
                    <button onClick={() => setFormDeploy(!formDeploy)}>Edit</button>
                    <button onClick={() => setDeleteDeploy(!formDeploy)}>Delete Post</button>
                    {deleteDeploy && 
                        <>
                            <h3>Are you sure that you want to Delete this Post?</h3>
                            <button onClick={() => setDeleteDeploy(false)}>Cancel</button>
                            <button onClick={deletePost}>Delete</button>
                        </>
                    }
                    {formDeploy && <FormToEdit
                        editProp={edit}
                        body={updateBody}
                        setBody={setUpdateBody}
                    />}
                    {postMessage && <a id='error'><span /><span /><span /><span />{postMessage}</a>}
                </div>
            }
            <br />
        </div>
    );
};