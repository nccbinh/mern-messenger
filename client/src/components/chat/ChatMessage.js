/**
 * Chat Message
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../../assets/styles/chat";

export default function ChatMessage({ from, time, message, avatar }) {
    const classes = useStyles();
    return (
        from ? <Box className={classes.chatMessageRoot}>
            <Box className={[classes.chatMessageDiv, classes.chatMessageFromDiv]}>
                <img src={avatar} width={40} height={40} alt="" className={classes.avatar} />
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