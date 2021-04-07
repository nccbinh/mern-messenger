/**
 * Chat Sidebar Header
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Avatar, Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chatSidebarHeader: {
        lineHeight: "6rem",
        height: "6rem",
        display: "flex"
    },
    chatUsername: {
        marginLeft: theme.spacing(1),
        lineHeight: "6rem",
        fontSize: "18px",
        fontWeight: "600"
    },
    avatar: {
        width: "50",
        height: "50",
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: theme.spacing(1)
    }
}));

export default function ChatSidebarHeader({ name, avatar }) {
    const classes = useStyles();
    return (
        <Box className={classes.chatSidebarHeader}>
            <Avatar src={avatar} alt="" className={classes.avatar} />
            <Typography component="p" className={classes.chatUsername}>{name}</Typography>
        </Box>
    );
}