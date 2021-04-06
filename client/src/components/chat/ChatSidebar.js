/**
 * Chat Sidebar
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../../assets/styles/chat";
import ChatSidebarHeader from "./ChatSidebarHeader";
import ChatUser from "./ChatUser";
import Search from "../../assets/images/search.svg"
import Avatar1 from "../../assets/images/avatar/7.png";
import Avatar2 from "../../assets/images/avatar/2.png";
import Avatar3 from "../../assets/images/avatar/3.png";
import Avatar4 from "../../assets/images/avatar/4.png";

export default function ChatSidebar() {
    const [search, setSearch] = React.useState("");
    const classes = useStyles();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    return (
        <Hidden smDown>
            <Grid item xs={false} sm={false} md={4} elevation={6} square>
                <Box className={classes.chatSidebar}>
                    <Box>
                        <ChatSidebarHeader name="thomas" avatar={Avatar1}/>
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
                                classes: { input: classes.inputSearch, },
                                startAdornment: (
                                    <img src={Search} className={classes.chatSearch} />
                                )
                            }}
                            name="search"
                            autoFocus
                            placeholder="Search"
                            value={search}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box className={classes.chatUsers}>
                        <ChatUser name="santiago" message="Where are you from?" avatar={Avatar2}/>
                        <ChatUser name="chiumbo" message="Sure! What time?" avatar={Avatar3}/>
                        <ChatUser name="hualing" message="Do you have any plan?" avatar={Avatar4}/>
                    </Box>
                </Box>
            </Grid>
        </Hidden>
    );
}