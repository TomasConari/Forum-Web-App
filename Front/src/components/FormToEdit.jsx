import { useState } from "react";
import { editStyles } from "../styles/editStyles";

export const FormToEdit = ({ headerProp, hostProp, id, user, editQuote, setMessageProp, reCall, setFormDeployProp, prevTitle, prevText }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [updateBody, setUpdateBody] = useState({
        username: user,
        title: "",
        text: ""
    });

    const edit = async () => {
        try{
            if(updateBody.title.length < 1){
                setErrorMessage("Title can not be Empty");
                setTimeout(() => setErrorMessage(""), 6000);
                return;
            };
            if(updateBody.text.length < 1){
                setErrorMessage("Text can not be Empty");
                setTimeout(() => setErrorMessage(""), 6000);
                return;
            };
            const response = await fetch(`${hostProp}/${editQuote}/update/${id}`, {
                method: "PUT",
                headers: headerProp,
                body: JSON.stringify(updateBody)
            });
            if(response.ok === false){
                setErrorMessage("An Error Occurred Editing The Comment");
                setTimeout(() => setErrorMessage(""), 6000);
            }else{
                setUpdateBody((prevBody) => ({
                    ...prevBody,
                    title: "",
                    text: ""
                }));
                reCall();
                setFormDeployProp(false);
                setMessageProp(`${editQuote} Edited Succesfully`);
                setTimeout(() => setMessageProp(""), 6000);
            };
        }catch(error){
            setErrorMessage("Connection Error, Try Again Later");
            setTimeout(() => setErrorMessage(""), 6000);
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
            <div style={editStyles.edit}>
                <div styles={{ display: "flex" }}>
                    <a
                        style={editStyles.whiteButtonStyle}
                        href="javascript:void(0)"
                        onClick={() => setFormDeployProp(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 256 256">
                            <path
                                fill="currentColor"
                                d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm-26.34 138.34a8 8 0 0 1-11.32 11.32L128 139.31l-42.34 42.35a8 8 0 0 1-11.32-11.32L116.69 128L74.34 85.66a8 8 0 0 1 11.32-11.32L128 116.69l42.34-42.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
                            />
                        </svg>
                    </a>
                </div>
                <div style={editStyles.content}>
                    <div style={editStyles.items}>
                        <div style={editStyles.column}>
                            <h2 style={editStyles.title}>Edit {editQuote}</h2>
                            <br />
                            <input
                                style={editStyles.formTitle}
                                type="text"
                                name="title"
                                autoComplete="off"
                                placeholder={prevTitle}
                                onChange={setBodyValues}
                            />
                            <textarea
                                style={editStyles.formText}
                                type="text"
                                name="text"
                                autoComplete="off"
                                placeholder={prevText}
                                rows={5}
                                onChange={setBodyValues}
                            />
                        </div>
                    </div>
                    {errorMessage &&
                        <div>
                            <br />
                            <h3 style={editStyles.error}>{errorMessage}</h3>
                        </div>
                    }
                    <br />
                    <div style={editStyles.buttons} className="createButtons">
                        <a 
                            href="javascript:void(0)" 
                            onClick={() => setFormDeployProp(false)}
                        >
                            Cancel
                        </a>
                        <a 
                            href="javascript:void(0)" 
                            onClick={edit}
                        >
                            Save Changes
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};