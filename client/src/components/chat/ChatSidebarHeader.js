/**
 * Chat Sidebar Header
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Avatar, Typography, Box, makeStyles } from '@material-ui/core';
import OnlineBadge from "./OnlineBadge";

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
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: theme.spacing(1)
    },
    avatarBadge: {
        marginTop: "auto",
        marginBottom: "auto",
    }
}));

export default function ChatSidebarHeader({ name, avatar }) {
    const classes = useStyles();
    return (
        <Box className={classes.chatSidebarHeader}>
            <OnlineBadge
                className={classes.avatarBadge}
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                <Avatar src={avatar} alt="" className={classes.avatar} />
            </OnlineBadge>
            <Typography component="p" className={classes.chatUsername}>{name}</Typography>
        </Box>
    );
}