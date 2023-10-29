import { deleteStyles } from "../styles/deleteStyle";

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
        <div style={deleteStyles.delete}>
            <div style={deleteStyles.items}>
                <a
                    style={deleteStyles.whiteButtonStyle}
                    href="javascript:void(0)"
                    onClick={() => setDeleteDeployProp(false)}
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
                <h3>Are you sure that you want to Delete this {eraseQuote}?</h3>
            </div>
            <br />
            <div style={deleteStyles.buttons} className="deleteButtons">
                <a
                    href="javascript:void(0)" 
                    onClick={() => setDeleteDeployProp(false)}
                >
                    Cancel
                </a>
                <a 
                    href="javascript:void(0)" 
                    style={{color: "#f40303"}} 
                    onClick={Erase}
                > 
                    Delete 
                </a>
            </div>
        </div>
    );
};