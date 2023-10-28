import { useState } from "react";
import { createFormStyles } from "../styles/createFormStyles";

export const FormToCreate = ({ id, createQuote, hostProp, localUsername, headerProp, reCall, setDeploy }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [createBody, setCreateBody] = useState({
        username: localUsername,
        title: "",
        text: ""
    });

    let url = `${hostProp}/${createQuote}/create/${id}`;

    if (createQuote === "Post") {
        url = `${hostProp}/${createQuote}/create`
    };

    const create = async () => {
        try {
            if (createBody.title.length > 25) {
                setErrorMessage("The title cannot be more than 25 characters");
                setTimeout(() => setErrorMessage(""), 4000);
            } else if (createBody.text.length > 560) {
                setErrorMessage("The text cannot be more than 560 characters");
                setTimeout(() => setErrorMessage(""), 4000);
            } else if ((createBody.title.length > 0) && (createBody.text.length > 0)) {
                const response = await fetch(url,
                    {
                        method: "POST",
                        headers: headerProp,
                        body: JSON.stringify(createBody)
                    }
                );
                if (response.ok === false) {
                    throw new Error;
                } else {
                    reCall();
                    setErrorMessage(`${createQuote} Created Succesfully`);
                    setTimeout(() => setErrorMessage(""), 4000);
                    setDeploy(false);
                };
            } else {
                setErrorMessage("Both Forms must be filled");
                setTimeout(() => setErrorMessage(""), 4000);
            };
        } catch (error) {
            setErrorMessage(`An Error Occurred Creating The ${createQote}`);
            setTimeout(() => setErrorMessage(""), 4000);
        };
    };

    const setBodyValues = (event) => {
        setCreateBody((prevBody) => ({
            ...prevBody,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <div style={createFormStyles.create}>
            <div style={{ display: "flex" }}>
                <a
                    style={createFormStyles.whiteButtonStyle}
                    href="javascript:void(0)"
                    onClick={() => setDeploy(false)}
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
            <div style={createFormStyles.content}>
                <div style={createFormStyles.items}>
                    <div style={createFormStyles.column}>
                        <h2 style={createFormStyles.title}>Create {createQuote}</h2>
                        <br />
                        <input
                            style={createFormStyles.formTitle}
                            type="text"
                            name="title"
                            placeholder="Title"
                            autoComplete="off"
                            onChange={setBodyValues}
                        />
                        <textarea
                            style={createFormStyles.formText}
                            type="text"
                            name="text"
                            placeholder="Text"
                            autoComplete="off"
                            rows={5}
                            onChange={setBodyValues}
                        />
                    </div>
                </div>
                {errorMessage && 
                    <div>
                        <br />
                        <h3 style={createFormStyles.error}>{errorMessage}</h3>
                    </div>
                }
                <br />
                <div style={createFormStyles.buttons} className="createButtons">
                    <a
                        href="javascript:void(0)"
                        onClick={() => setDeploy(false)}
                    >
                        Cancel
                    </a>
                    <a
                        href="javascript:void(0)"
                        onClick={create}
                    >
                        Create {createQuote}
                    </a>
                </div>
            </div>
        </div>
    );
};