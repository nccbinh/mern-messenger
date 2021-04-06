/**
 * Dashboard Styles
 * Styling for Dashboard
 * @since 0.1.0
 */
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    whiteBg: {
        background: "white"
    },
    chatPaneHeader: {
        lineHeight: "6rem",
        height: "6rem",
        marginLeft: "0.5rem",
        boxShadow: "0 5px 15px rgb(0 0 0 / 10%)"
    },
    chatPaneBody: {
        height: "calc(100vh - 13rem)",
        overflowX: "hidden",
        overflowY: "auto",
        padding: "1rem"
    },
    chatInput: {
        margin: "1rem",
        height: "5rem",
        padding: "0.5rem 2rem",
        borderRadius: "10px",
        background: "rgb(0, 0, 0, 0.05)"
    },
    chatPaneHeaderUsername: {
        fontSize: "25px",
        fontWeight: "600",
        marginLeft: "2rem",
        display: "inline-block",
        verticalAlign: "middle"
    },
    chatMessageRoot: {
        display: "flow-root"
    },
    chatMessageDiv: {
        margin: "0.5rem",
    },
    chatMessageFromDiv: {
        maxWidth: "60%",
        display: "flex"
    },
    chatMessageToDiv: {
        maxWidth: "60%",
        float: "right",
        textAlign: "end"
    },
    time: {
        marginBottom: "0.2rem",
        fontSize: "12px",
        fontWeight: "600",
        color: "lightgray"
    },
    chatMessage: {
        overflowWrap: "break-word",
        fontSize: "14px",
        fontWeight: "600",
        padding: "0.5rem 1rem",
        width: "fit-content",
        maxWidth: "100%"
    },
    chatMessageFrom: {
        borderRadius: "0px 8px 8px 8px",
        color: "white",
        backgroundImage:
            "linear-gradient(to right, rgb(58, 141, 255, 0.85) 0%, rgb(134, 185, 255, 0.85) 100%)",
    },
    chatMessageTo: {
        borderRadius: "8px 8px 0px 8px",
        color: "gray",
        background: "rgb(0, 0, 0, 0.05)",
        textAlign: "justify"
    },
    box: {
        padding: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        maxWidth: 900,
        margin: "auto"
    },
    inputs: {
        marginTop: "-0.2rem",
        fontSize: "15px",
        fontWeight: "600",
        color: "gray"
    },
    inputSearch: {
        marginTop: "-0.6rem",
        fontSize: "13px",
        fontWeight: "600",
        color: "gray"
    },
    send: {
        marginTop: "-0.2rem",
        fontSize: "15px",
        paddingRight: 10,
        color: "#3a8dff"
    },
    avatar: {
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: "0.5rem",
        borderRadius: "50%"
    },
    chatSidebar: {
        marginLeft: "1.5rem"
    },
    chatSidebarHeader: {
        lineHeight: "6rem",
        height: "6rem",
        display: "flex"
    },
    chatUsername: {
        marginLeft: "1rem",
        lineHeight: "6rem",
        fontSize: "18px",
        fontWeight: "600"
    },
    userSearchInput: {
        margin: "0.5rem 0",
        height: "3.5rem",
        padding: "0.5rem 1rem",
        borderRadius: "10px",
        background: "rgb(0, 0, 0, 0.05)"
    },
    chatSearch: {
        marginTop: "-0.6rem",
        marginRight: "0.5rem"
    },
    chatUser: {
        display: "flex",
        padding: "0.5rem 1rem",
        '&:hover': {
            background: "white",
            boxShadow: "0 5px 15px rgb(0 0 0 / 10%)"
         }
    },
    chatName: {
        fontSize: "16px",
        fontWeight: "600",
        marginLeft: "0.3rem",
        marginTop: "0.2rem"
    },
    chatPreview: {
        fontSize: "14px",
        marginLeft: "0.3rem",
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    chatUsers: {
        height: "calc(100vh - 13rem)",
        overflowX: "hidden",
        overflowY: "auto"
    }
}));

export { useStyles }