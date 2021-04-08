/**
 * Chat Sidebar Header
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from "react";
import {
  Avatar,
  Typography,
  Box,
  IconButton,
  makeStyles,
  Tooltip,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import OnlineBadge from "./OnlineBadge";

const useStyles = makeStyles((theme) => ({
  chatSidebarHeader: {
    lineHeight: "6rem",
    height: "6rem",
    display: "flex",
  },
  chatUsername: {
    marginLeft: theme.spacing(1),
    lineHeight: "6rem",
    fontSize: "18px",
    fontWeight: "600",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: theme.spacing(1),
  },
  avatarBadge: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  menuButton: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "0",
    color: "gray",
  },
  logoutIcon: {
    marginRight: theme.spacing(2),
  },
}));

export default function ChatSidebarHeader({ name, avatar, logoutHandler }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.chatSidebarHeader}>
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
      <Typography component="p" className={classes.chatUsername}>
        {name}
      </Typography>
      <Tooltip title="User menu" aria-label="User menu">
        <IconButton
          color="inherit"
          aria-label="User menu"
          edge="end"
          onClick={handleClick}
          className={classes.menuButton}
        >
          <MoreHoriz />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={logoutHandler}>
          <ExitToAppIcon className={classes.logoutIcon} /> Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
