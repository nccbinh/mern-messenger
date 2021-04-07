/**
 * Chat User
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Avatar, Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chatMessageRoot: {
        display: "flow-root"
    },
    chatName: {
        fontSize: "16px",
        fontWeight: "600",
        marginTop: "0.2rem"
    },
    avatar: {
        width: "50",
        height: "50",
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: theme.spacing(3),
    },
    chatPreview: {
        fontSize: "14px",
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    chatUser: {
        display: "flex",
        padding: theme.spacing(2),
        '&:hover': {
            background: "white",
            boxShadow: "0 5px 15px rgb(0 0 0 / 10%)"
        }
    }
}));

export default function ChatUser({ name, message, avatar }) {
    const classes = useStyles();
    return (
        <Box className={classes.chatMessageRoot}>
            <Box className={classes.chatUser}>
                <Avatar src={avatar} alt="" className={classes.avatar} />
                <div>
                    <Typography className={classes.chatName}>{name}</Typography>
                    <Typography className={classes.chatPreview}>{message}</Typography>
                </div>
            </Box>
        </Box>
    );
}