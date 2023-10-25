export const Delete = ({ id, eraseQuote, headerProp, hostProp, reCall, setDeleteDeployProp, setMessageProp }) => {
    
    const Erase = async () => {
        try{
            const response = await fetch(`${hostProp}/${eraseQuote}/delete/${id}`, {
                method: "DELETE",
                headers: headerProp
            });
            if(response.ok === false){
                throw new Error;
            }else{
                reCall();
                setDeleteDeployProp(false);
                setMessageProp(`${eraseQuote} Deleted Succesfully`);
                setTimeout(() => setMessageProp(""), 6000);
            };
        }catch(error){
            console.error(error);
            setMessageProp("Connection Error, Try Again Later");
            setTimeout(() => setMessageProp(""), 6000);
        };
    };

    return(
        <>
            <button onClick={() => setDeleteDeployProp(false)}>X</button>
            <h3>Are you sure that you want to Delete this {eraseQuote}?</h3>
            <button onClick={() => setDeleteDeployProp(false)}>Cancel</button>
            <button onClick={Erase}>Delete</button>
         </>
    );
};