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
import { Grid, Box } from '@material-ui/core';

export default function ChatPane() {
    return (
        <Grid xs={12} sm={12} md={8} elevation={6} square>
            <Box>
                <ChatPaneHeader name="santiago"/>
                <ChatBody avatar={Avatar} name="santiago"/>
                <ChatInput />
            </Box>
        </Grid>
    );
}