/**
 * Chat Sidebar Header
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../../assets/styles/chat";

export default function ChatSidebarHeader({ name, avatar }) {
    const classes = useStyles();
    return (
        <Box className={classes.chatSidebarHeader}>
            <img src={avatar} width={50} height={50} alt="" className={classes.avatar} />
            <Typography component="p" className={classes.chatUsername}>{name}</Typography>
        </Box>
    );
}