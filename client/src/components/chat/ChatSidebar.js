/**
 * Chat Sidebar
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { TextField, Hidden, Box, makeStyles, Drawer } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import ChatSidebarHeader from "./ChatSidebarHeader";
import ChatUser from "./ChatUser";
import Avatar1 from "../../assets/images/avatar/7.png";
import Avatar2 from "../../assets/images/avatar/2.png";
import Avatar3 from "../../assets/images/avatar/3.png";
import Avatar4 from "../../assets/images/avatar/4.png";

const drawerWidth = 350;
const useStyles = makeStyles(theme => ({
    chatSidebar: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3)
    },
    userSearchInput: {
        margin: "0.5rem 0",
        height: "3.5rem",
        padding: "0.5rem 1rem",
        borderRadius: "10px",
        background: "#E9EEF9"
    },
    chatSearch: {
        marginTop: "-0.6rem",
        marginRight: theme.spacing(1),
        color: "#99A9C4"
    },
    chatUsers: {
        height: "calc(100vh - 13rem)",
        overflowX: "hidden",
        overflowY: "auto"
    },
    inputSearch: {
        marginTop: "-0.6rem",
        fontSize: "13px",
        fontWeight: "600",
        color: "#99A9C4"
    },
    // drawer css
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    drawerPaper: {
        border: "none",
        width: drawerWidth,
        [theme.breakpoints.down('xs')]: {
            width: "80%",
            flexShrink: 0,
        }
    }
}));

export default function ChatSidebar({openSidebar, closeSidebarHandler}, props) {
    const { window } = props;
    const [search, setSearch] = React.useState("");
    const classes = useStyles();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const drawer = (
        <Box className={classes.chatSidebar}>
            <Box>
                <ChatSidebarHeader name="thomas" avatar={Avatar1} />
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
                        startAdornment: (
                            <Search className={classes.chatSearch} />
                        )
                    }}
                    name="search"
                    placeholder="Search"
                    value={search}
                    onChange={handleChange}
                />
            </Box>
            <Box className={classes.chatUsers}>
                <ChatUser name="santiago" message="Where are you from?" avatar={Avatar2} />
                <ChatUser name="chiumbo" message="Sure! What time?" avatar={Avatar3} />
                <ChatUser name="hualing" message="Do you have any plan?" avatar={Avatar4} />
            </Box>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav className={classes.drawer}>
            <Hidden smUp>
                <Drawer
                container={container}
                    variant="temporary"
                    anchor={'left'}
                    open={openSidebar}
                    onClose={closeSidebarHandler}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown>
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