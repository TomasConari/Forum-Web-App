export const Post = ({ id, title, text, user }) =>{
    return(
        <div id={id}>
            <h3>{title}</h3>
            <h5>{text}</h5>
            <h4>Posted By {user}</h4>
            <br />
        </div>
    );
};