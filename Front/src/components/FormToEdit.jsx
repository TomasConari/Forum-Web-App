import { useState } from "react";

export const FormToEdit = ({ headerProp, hostProp, id, user, eraseQuote, setMessageProp, reCall, setFormDeployProp }) => {

    const [updateBody, setUpdateBody] = useState({
        username: user,
        title: "",
        text: ""
    });

    const edit = async () => {
        try{
            if(updateBody.title.length < 1){
                setMessageProp("Title can not be Empty");
                setTimeout(() => setMessageProp(""), 6000);
                return;
            };
            if(updateBody.text.length < 1){
                setMessageProp("Text can not be Empty");
                setTimeout(() => setMessageProp(""), 6000);
                return;
            };
            const response = await fetch(`${hostProp}/${eraseQuote}/update/${id}`, {
                method: "PUT",
                headers: headerProp,
                body: JSON.stringify(updateBody)
            });
            if(response.ok === false){
                setMessageProp(response.message);
                setTimeout(() => setMessageProp(""), 6000);
            }else{
                setUpdateBody((prevBody) => ({
                    ...prevBody,
                    title: "",
                    text: ""
                }));
                reCall();
                setFormDeployProp(false);
                setMessageProp(response.message);
                setTimeout(() => setMessageProp(""), 6000);
            };
        }catch(error){
            setMessageProp("Connection Error, Try Again Later");
            setTimeout(() => setMessageProp(""), 6000);
        };
    };

    const setBodyValues = (event) => {
        setUpdateBody((prevBody) => ({
            ...prevBody,
            [event.target.name]: event.target.value
        }));
    };
    
    return(
        <>
            <div className="user-box">
                <input 
                    type="text"
                    name="title"
                    autoComplete="off"
                    placeholder="New Title"
                    onChange={setBodyValues} 
                />
            </div>
            <div className="user-box">
                <input 
                    type="text"
                    name="text"
                    autoComplete="off"
                    placeholder="New Text"
                    onChange={setBodyValues} 
                />
            </div>
            <a href="#" onClick={edit}>
                Save Changes
            </a>
        </>
    );
};