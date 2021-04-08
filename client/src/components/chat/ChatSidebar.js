/**
 * Chat Sidebar
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from "react";
import { TextField, Hidden, Box, makeStyles, Drawer } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import ChatSidebarHeader from "./ChatSidebarHeader";
import ChatUser from "./ChatUser";

const drawerWidth = 350;
const useStyles = makeStyles((theme) => ({
  chatSidebar: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  userSearchInput: {
    margin: "0.5rem 0",
    height: "3.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    background: "#E9EEF9",
  },
  chatSearch: {
    marginTop: "-0.6rem",
    marginRight: theme.spacing(1),
    color: "#99A9C4",
  },
  chatUsers: {
    height: "calc(100vh - 13rem)",
    overflowX: "hidden",
    overflowY: "auto",
  },
  inputSearch: {
    marginTop: "-0.6rem",
    fontSize: "13px",
    fontWeight: "600",
    color: "#99A9C4",
  },
  // drawer css
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    border: "none",
    width: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "80%",
      flexShrink: 0
    },
  },
}));

export default function ChatSidebar(
  {
    username,
    avatar,
    conversations,
    openSidebar,
    searchHandler,
    closeSidebarHandler,
    logoutHandler,
  },
  props
) {
  const { window } = props;
  const [search, setSearch] = React.useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleConvClick = (id) => {
    console.log(id);
  };

  const handleSearch = () => {
    if (!search) return;
    searchHandler(search);
  };

  const drawer = (
    <Box className={classes.chatSidebar}>
      <Box>
        <ChatSidebarHeader
          name={username}
          avatar={avatar}
          logoutHandler={logoutHandler}
        />
      </Box>
      <Box fontWeight={600} fontSize="h5.fontSize">
        Chats
      </Box>
      <Box className={classes.userSearchInput}>
        <TextField
          id="search"
          fullWidth
          margin="normal"
          InputProps={{
            disableUnderline: true,
            classes: { input: classes.inputSearch },
            startAdornment: <Search className={classes.chatSearch} />,
          }}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              handleSearch();
              ev.preventDefault();
            }
          }}
          name="search"
          placeholder="Search"
          value={search}
          onChange={handleChange}
        />
      </Box>
      <Box className={classes.chatUsers}>
        {conversations.map((conv) => {
          return (
            <ChatUser
              name={conv.name}
              key={conv.id}
              clickHandler={() => {
                handleConvClick(conv.id);
              }}
              online={conv.online}
              unread={conv.unread}
              message={conv.preview}
              avatar={conv.avatar}
            />
          );
        })}
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp>
        <Drawer
          container={container}
          variant="temporary"
          anchor={"left"}
          open={openSidebar}
          onClose={closeSidebarHandler}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
