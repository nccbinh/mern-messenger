/**
 * Chat Pane
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../../assets/styles/chat";
import ChatPaneHeader from "./ChatPaneHeader";
import ChatInput from "./ChatInput";
import ChatBody from "./ChatPaneBody";
import Avatar from "../../assets/images/avatar/2.png";

export default function ChatPane() {
    const classes = useStyles();
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