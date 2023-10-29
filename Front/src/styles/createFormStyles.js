export const createFormStyles = {
    create: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#000",
        padding: "1%",
        boxSizing: "border-box",
        boxShadow: "0 15px 25px rgba(0,0,0,.6)",
        borderRadius: "10px",
        width: "50%",
        zIndex: "4",
    },
    whiteButtonStyle: {
        fontSize: "1.5em",
        color: "#fff",
        textDecoration: "none",
        marginLeft: "auto"
    },
    items: {
        display: "flex", 
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%"
    },
    buttons: {
        display: "flex", 
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%"
    },
    title: {
        textAlign: "center", 
        color: "#fff"
    },
    column: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%"
    },
    content: {
        display: "flex", 
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%"
    },
    formTitle: {
        width: "60%",
        padding: "10px 0",
        fontSize: "16px",
        color:"#fff",
        marginBottom: "30px",
        border: "none",
        borderBottom: "1px solid #fff",
        borderRight: "1px solid #fff",
        outline: "none",
        background: "transparent",
    },
    formText: {
        width: "60%",
        padding: "10px 0",
        fontSize: "16px",
        color:"#fff",
        marginBottom: "30px",
        border: "none",
        borderBottom: "1px solid #fff",
        borderRight: "1px solid #fff",
        outline: "none",
        background: "transparent",
    },
    error: {
        border: "2px solid #f40303",
        color: "#f40303",
        background: "#fff",
        padding: "2%",
        borderRadius: "10px",
        textAlign: "center"
    },
};