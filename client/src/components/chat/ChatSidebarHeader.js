/**
 * Chat Sidebar Header
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Avatar, Typography, Box, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
    },
    menuButton: {
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "0",
        color: "gray"
    }
}));

export default function ChatSidebarHeader({ name, avatar, logoutHandler }) {
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
            <Tooltip title="Logout" aria-label="Logout">
                <IconButton
                    color="inherit"
                    aria-label="Logout"
                    edge="end"
                    onClick={logoutHandler}
                    className={classes.menuButton}
                ><ExitToAppIcon /></IconButton>
            </Tooltip>
        </Box>
    );
}