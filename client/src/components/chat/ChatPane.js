/**
 * Chat Pane
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import ChatPaneHeader from "./ChatPaneHeader";
import ChatInput from "./ChatInput";
import ChatBody from "./ChatPaneBody";
import Avatar from "../../assets/images/avatar/2.png";
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    }
}));

export default function ChatPane({openSidebarHandler}) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <ChatPaneHeader name="santiago" openSidebarHandler={openSidebarHandler} />
            <ChatBody avatar={Avatar} name="santiago" />
            <ChatInput />
        </Box>
    );
}