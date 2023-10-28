export const postStyles = {
    imageStyle: {
        width: "30px", 
        height: "30px", 
        borderRadius: "5px"
    },
    post: {
        background: "rgba(0,0,0,.5)",
        boxSizing: "border-box",
        boxShadow: "0 15px 25px rgba(0,0,0,.4)",
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "10px",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        overflow: "hidden",
        alignItems: "center",
    },
    optionsDeploy: {
        position: "absolute",
        right: "6%",
        zIndex: "0",
    },
    whiteButtonStyle: {
        fontSize: "1.5em",
        color: "#fff",
        textDecoration: "none"
    },
    blueButtonStyle: {
        fontSize: "1.5em",
        color: "#0e161f",
        textDecoration: "none",
        margin: "10px"
    },
    commentsSection: {
        marginLeft: "3%",
        background: "#1c2b3d",
        borderRadius: "10px",
        padding: "10px",
        paddingBottom: "0px",
        paddingBottom: "10px",
        maxHeight: "80vh",
        overflowY: "auto",
    },
    strong:{
        display: "flex",
        alignItems: "center",
    },
    user: { 
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between" 
    },
    userTitle: { 
        margin: "0 15px" ,
    },
    ul: { 
        listStyle: "none", 
        background: "rgba(228,230,231,255)", 
        padding: "20px", borderRadius: "20px", 
        borderTopRightRadius: "0" 
    },
    white: {
        color: "#fff"
    },
    message: {
        color: "#fff",
    }
};

export const commentIcon = {
    showingComments:
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="m20.475 23.3l-5.3-5.3H4q-.825 0-1.413-.588T2 16V4.825L.675 3.5L2.1 2.075l19.8 19.8l-1.425 1.425ZM22 19.125L16.875 14H18v-2h-3.125l-1-1H18V9h-6.125l-1-1H18V6H8.875l-4-4H20q.825 0 1.413.588T22 4v15.125ZM6 14h5.175l-2-2H6v2Zm0-3h2.175l-2-2H6v2Z"
            />
        </svg>,
    hiddinComments:
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M6 14h12v-2H6v2Zm0-3h12V9H6v2Zm0-3h12V6H6v2ZM4 18q-.825 0-1.413-.588T2 16V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v18l-4-4H4Z"
            />
        </svg>
};