/**
 * Chat Message
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Avatar, Typography, Box, Tooltip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chatMessageRoot: {
        display: "flow-root"
    },
    avatar: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    chatMessageDiv: {
        margin: theme.spacing(1)
    },
    chatMessageFromDiv: {
        maxWidth: "60%",
        marginRight: theme.spacing(4),
        display: "flex",
        [theme.breakpoints.down('md')]: {
            maxWidth: "400px"
        }
    },
    chatMessageToDiv: {
        maxWidth: "60%",
        marginLeft: theme.spacing(4),
        float: "right",
        textAlign: "end",
        [theme.breakpoints.down('md')]: {
            maxWidth: "400px"
        }
    },
    time: {
        marginBottom: "0.2rem",
        fontSize: "12px",
        fontWeight: "600",
        color: "#91A3C0"
    },
    chatMessage: {
        overflowWrap: "break-word",
        fontSize: "14px",
        fontWeight: "600",
        padding: "0.5rem 1rem",
        width: "fit-content",
        maxWidth: "100%"
    },
    chatMessageFrom: {
        borderRadius: "0px 8px 8px 8px",
        color: "white",
        backgroundImage:
            "linear-gradient(to right, rgb(58, 141, 255, 0.85) 0%, rgb(134, 185, 255, 0.85) 100%)",
    },
    chatMessageTo: {
        float: "right",
        borderRadius: "8px 8px 0px 8px",
        color: "#91A3C0",
        background: "#F4F6FA",
        textAlign: "left"
    },
}));

export default function ChatMessage({ from, time, message, avatar }) {
    const classes = useStyles();

    const formatTime = (time) => {
        const curr = new Date();
        const year = formatNum(time.getYear() > 100 ? time.getYear() - 100 : this.getYear());
        const month = formatNum(time.getMonth() + 1);
        const date = formatNum(time.getDate());
        let result = formatNum(time.getHours()) + ":" + formatNum(time.getMinutes());
        if (time.getDate() !== curr.getDate()
            || time.getMonth() !== curr.getMonth()
            || time.getYear() !== curr.getYear()) {
            result += " " + month + "/" + date;
            if (time.getYear() !== curr.getYear()) {
                result += "/" + year;
            }
        }
        return result;
    }

    const formatNum = (num) => {
        return (num < 10 ? "0" : "") + num;
    }

    return (
        from ? <Box className={classes.chatMessageRoot}>
            <Box className={classes.chatMessageDiv + " " + classes.chatMessageFromDiv}>
                <Avatar src={avatar} alt="" className={classes.avatar} />
                <div>
                    <Tooltip title={time.toLocaleString()}>
                        <Typography className={classes.time}>
                            {from} {formatTime(time)}
                        </Typography>
                    </Tooltip>
                    <Typography className={classes.chatMessage + " " + classes.chatMessageFrom}>{message}</Typography>
                </div>
            </Box>
        </Box>
            : <Box className={classes.chatMessageRoot}>
                <Box className={classes.chatMessageDiv + " " + classes.chatMessageToDiv}>
                    <Tooltip title={time.toLocaleString()}>
                        <Typography className={classes.time}>
                            {formatTime(time)}
                        </Typography>
                    </Tooltip>
                    <Typography className={classes.chatMessage + " " + classes.chatMessageTo}>{message}</Typography>
                </Box></Box>
    );
}