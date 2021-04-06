/**
 * Chat Pane Header
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../../assets/styles/chat";

export default function ChatPaneHeader({name}) {
    const classes = useStyles();
    return (
        <Box className={[classes.chatPaneHeader,classes.whiteBg]}>
            <Typography component="h1" className={classes.chatPaneHeaderUsername}>{name}</Typography>
        </Box>
    );
}