export const FormToEdit = ({ setBody, editProp }) => {

    const setBodyValues = (event) => {
        setBody((prevBody) => ({
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
                    placeholder="New Title"
                    onChange={setBodyValues} 
                />
            </div>
            <div className="user-box">
                <input 
                    type="text"
                    name="text"
                    placeholder="New Text"
                    onChange={setBodyValues} 
                />
            </div>
            <a href="#" onClick={editProp}>
                Save Changes
            </a>
        </>
    );
};