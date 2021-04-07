/**
 * Chat Message
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Avatar, Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chatMessageRoot: {
        display: "flow-root"
    },
    avatar: {
        width: "40",
        height: "40",
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: "0.5rem"
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
        color: "#91A3C0"
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
        color: "#91A3C0",
        background: "#F4F6FA",
        textAlign: "left"
    },
}));

export default function ChatMessage({ from, time, message, avatar }) {
    const classes = useStyles();
    return (
        from ? <Box className={classes.chatMessageRoot}>
            <Box className={[classes.chatMessageDiv, classes.chatMessageFromDiv]}>
                <Avatar src={avatar} alt="" className={classes.avatar} />
                <div>
                    <Typography className={classes.time}>{from} {time}</Typography>
                    <Typography className={[classes.chatMessage, classes.chatMessageFrom]}>{message}</Typography>
                </div>
            </Box>
        </Box>
            : <Box className={classes.chatMessageRoot}>
                <Box className={[classes.chatMessageDiv, classes.chatMessageToDiv]}>
                    <Typography className={classes.time}>{time}</Typography>
                    <Typography className={[classes.chatMessage, classes.chatMessageTo]}>{message}</Typography>
                </Box></Box>
    );
}