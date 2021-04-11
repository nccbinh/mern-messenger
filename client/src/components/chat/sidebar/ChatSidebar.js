/**
 * Chat Sidebar
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React, { useContext } from "react";
import {
  TextField,
  Hidden,
  Box,
  makeStyles,
  Drawer,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import ChatContext from "../ChatContext";
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
      flexShrink: 0,
    },
  },
  loading: {
    marginTop: "-0.7rem",
  },
  emptyList: {
    fontWeight: "600",
    color: "#99A9C4",
    textAlign: "center",
    marginTop: theme.spacing(5),
  },
  emptyListSearch: {
    marginBottom: "-0.3rem",
  },
}));

export default function ChatSidebar({ handlers }, props) {
  const { window } = props;
  const context = useContext(ChatContext);
  const [search, setSearch] = React.useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    // clears search field when user clicks on a user
    setSearch("");
  };

  const handleSearch = () => {
    handlers.onSearch(search);
  };

  // decides whether to show list of chats or list of found users
  const list = search
    ? context.sidebar.users
    : context.sidebar.chats;

  // drawer definition
  const drawer = (
    <Box className={classes.chatSidebar}>
      <Box>
        <ChatSidebarHeader handlers={handlers} />
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
            endAdornment: context.sidebar.busy ? (
              <CircularProgress
                className={classes.loading}
                color="inherit"
                size={20}
              />
            ) : null,
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
          disabled={context.sidebar.busy}
        />
      </Box>
      <Box className={classes.chatUsers}>
        {list.length > 0 ? (
          list.map((item, ind) => {
            return <ChatUser key={ind} params={item} onClick={clearSearch} handlers={handlers} />;
          })
        ) : (
          <Typography className={classes.emptyList}>
            Search <Search className={classes.emptyListSearch} /> and start
            chatting...
          </Typography>
        )}
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    // shows a responsive sidebar with either a temporary or a permanent drawer
    // depending on screen size
    <nav className={classes.drawer}>
      <Hidden mdUp>
        <Drawer
          container={container}
          variant="temporary"
          anchor={"left"}
          open={context.sidebar.show}
          onClose={handlers.onClose}
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
          open={true}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
