/**
 * Chat User
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from "react";
import { Avatar, Typography, Box, Button, makeStyles } from "@material-ui/core";
import OnlineBadge from "./OnlineBadge";

const useStyles = makeStyles((theme) => ({
  chatMessageRoot: {
    display: "flow-root",
  },
  chatName: {
    marginLeft: theme.spacing(2),
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "0.2rem",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: theme.spacing(1),
  },
  chatPreview: {
    marginLeft: theme.spacing(2),
    fontSize: "14px",
    maxWidth: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "400",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "40vw",
    },
  },
  chatUnread: {
    fontWeight: "600",
  },
  chatUser: {
    cursor: "pointer",
    display: "flex",
    padding: theme.spacing(2),
    "&:hover": {
      boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
    },
    "&:active": {
      background: "#E9EEF9",
      boxShadow: "inset 0 5px 15px rgb(0 0 0 / 10%)",
    },
  },
  selected: {
    background: "#E9EEF9",
  },
}));

export default function ChatUser({
  selected,
  name,
  message,
  unread,
  online,
  avatar,
  clickHandler,
}) {
  const classes = useStyles();
  return (
    <Box className={classes.chatMessageRoot}>
      <Box
        onClick={clickHandler}
        className={classes.chatUser + " " + (selected ? classes.selected : "")}
      >
        {online ? (
          <OnlineBadge
            className={classes.avatarBadge}
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar src={avatar} alt="" className={classes.avatar} />
          </OnlineBadge>
        ) : (
          <Avatar src={avatar} alt="" className={classes.avatar} />
        )}
        <div>
          <Typography className={classes.chatName}>{name}</Typography>
          <Typography
            className={
              classes.chatPreview + " " + (unread ? classes.chatUnread : "")
            }
          >
            {message}
          </Typography>
        </div>
      </Box>
    </Box>
  );
}
