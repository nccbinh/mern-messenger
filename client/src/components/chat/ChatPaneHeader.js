/**
 * Chat Pane Header
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chatPaneHeader: {
        background: "white",
        lineHeight: "6rem",
        height: "6rem",
        marginLeft: theme.spacing(1),
        boxShadow: "0 5px 15px rgb(0 0 0 / 10%)"
    },
    chatPaneHeaderUsername: {
        fontSize: "25px",
        fontWeight: "600",
        marginLeft: "2rem",
        display: "inline-block",
        verticalAlign: "middle"
    }
}));

export default function ChatPaneHeader({ name }) {
    const classes = useStyles();
    return (
        <Box className={classes.chatPaneHeader}>
            <Typography component="h1" className={classes.chatPaneHeaderUsername}>{name}</Typography>
        </Box>
    );
}