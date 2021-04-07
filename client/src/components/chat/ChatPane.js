/**
 * Chat Pane
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import ChatPaneHeader from "./ChatPaneHeader";
import ChatInput from "./ChatInput";
import ChatBody from "./ChatPaneBody";
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    }
}));

export default function ChatPane({name, avatar, online, messages, messageHandler, openSidebarHandler}) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <ChatPaneHeader 
                name={name} online={online}
                openSidebarHandler={openSidebarHandler} />
            <ChatBody avatar={avatar} messages={messages} name={name} />
            <ChatInput messageHandler={messageHandler}/>
        </Box>
    );
}