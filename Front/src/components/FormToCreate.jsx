import { useState } from "react";

export const FormToCreate = ({ id, createQuote, hostProp, localUsername, headerProp, reCall, setMessageProp, setDeploy }) => {

    const [createBody, setCreateBody] = useState({
        username: localUsername,
        title: "",
        text: ""
    });

    let url = `${hostProp}/${createQuote}/create/${id}`;

    if(createQuote === "Post"){
        url = `${hostProp}/${createQuote}/create`
    };

    const create = async () => {
        try{
            if((createBody.title.length > 0) && (createBody.text.length > 0)){
                const response = await fetch(url,
                    {
                        method: "POST",
                        headers: headerProp,
                        body: JSON.stringify(createBody)
                    }
                );
                if(response.ok === false){
                    throw new Error;
                }else{
                    reCall();
                    setMessageProp(`${createQuote} Created Succesfully`);
                    setTimeout(() => setMessageProp(""), 4000);
                    setDeploy(false);
                }
            }else{
                setMessageProp("Both Forms must be filled");
                setTimeout(() => setMessageProp(""), 4000);
            };
        }catch(error){
            setMessageProp(`An Error Occurred Creating The ${createQuote}`);
            setTimeout(() => setMessageProp(""), 4000);
        };
    };

    const setBodyValues = (event) => {
        setCreateBody((prevBody) => ({
            ...prevBody,
            [event.target.name]: event.target.value
        }));
    };
    
    return(
        <>
            <h3>Create {createQuote}</h3>
            <button onClick={() => setDeploy(false)}>X</button>
            <div className="user-box">
                <input 
                    type="text"
                    name="title"
                    placeholder="Title"
                    autoComplete="off"
                    onChange={setBodyValues} 
                />
            </div>
            <div className="user-box">
                <input 
                    type="text"
                    name="text"
                    placeholder="Text"
                    autoComplete="off"
                    onChange={setBodyValues} 
                />
            </div>
            <a href="#" onClick={create}>
                Create {createQuote}
            </a>
        </>
    );
};