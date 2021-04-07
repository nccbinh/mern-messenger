/**
 * Chat Pane Header
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Typography, Box, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import OnlineBadge from "./OnlineBadge";

const useStyles = makeStyles(theme => ({
    chatPaneHeader: {
        background: "white",
        lineHeight: "6rem",
        height: "6rem",
        marginLeft: theme.spacing(1),
        boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
        [theme.breakpoints.down('xs')]: {
            marginLeft: "0",
        }
    },
    chatPaneHeaderUsername: {
        fontSize: "25px",
        fontWeight: "600",
        marginLeft: theme.spacing(4),
        display: "inline-block",
        verticalAlign: "middle",
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(2)
        }
    },
    menuButton: {
        marginLeft: theme.spacing(2),
        marginRight: "0",
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        color: "gray"
    },
    badge: {
        marginTop: "0.2rem",
        marginLeft: theme.spacing(3)
    },
    online: {
        display: "inline-block",
        verticalAlign: "middle",
        marginLeft: theme.spacing(1),
        paddingTop: "0.1rem",
        fontSize: "14px",
        fontWeight: "600",
        color: "#91A3C0"
    }
}));

export default function ChatPaneHeader({ name, online, openSidebarHandler }) {
    const classes = useStyles();

    return (
        <Box className={classes.chatPaneHeader}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={openSidebarHandler}
                className={classes.menuButton}
            ><MenuIcon /></IconButton>
            <Typography component="h1" className={classes.chatPaneHeaderUsername}>{name}</Typography>
            {online &&
                <span>
                    <OnlineBadge
                        className={classes.badge}
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot">
                    </OnlineBadge>
                    <Typography component="h1" className={classes.online}>Online</Typography>
                </span>
            }
        </Box>
    );
}