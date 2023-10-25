import { useState } from "react";
import { Delete } from "./Delete";
import { FormToEdit } from "./FormToEdit";

export const Comment = ({ id, localUser, user, title, text, headerProp, hostProp, reCallComments, setAllMessages }) => {

    const [deleteCommentDeploy, setDeleteCommentDeploy] = useState(false);
    const [commentFormDeploy, setCommentFormDeploy] = useState(false);

    return(
        <div className="comments" id={id}>
            <h5>{user}</h5>
            <h6>{title}</h6>
            <p>{text}</p>
            {((user === localUser.username) || (localUser.role === "admin")) && 
                <>
                    {user === localUser.username && 
                        <button 
                            onClick={() => {
                                setCommentFormDeploy(!commentFormDeploy);
                                setDeleteCommentDeploy(false);
                            }}>Edit
                        </button>
                    }
                    <button
                        onClick={() => {
                            setCommentFormDeploy(false);
                            setDeleteCommentDeploy(!deleteCommentDeploy);
                        }}>Delete Comment
                    </button>
                </>
            }
            {deleteCommentDeploy && 
                <Delete 
                    id={id}
                    eraseQuote="Comment"
                    headerProp={headerProp}
                    hostProp={hostProp}
                    reCall={reCallComments}
                    setDeleteDeployProp={setDeleteCommentDeploy}
                    setMessageProp={setAllMessages}
                />
            }
            {commentFormDeploy && 
                <FormToEdit
                    headerProp={headerProp}
                    hostProp={hostProp}
                    id={id}
                    user={user}
                    eraseQuote={"Comment"}
                    setMessageProp={setAllMessages}
                    reCall={reCallComments}
                    setFormDeployProp={setCommentFormDeploy}
                />
            }
        </div>
    );
};