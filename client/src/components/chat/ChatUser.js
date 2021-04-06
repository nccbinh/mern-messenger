/**
 * Chat User
 * @author Binh Nguyen
 * @since 0.1.0
 */
 import React from 'react';
 import Box from "@material-ui/core/Box";
 import Typography from "@material-ui/core/Typography";
 import { useStyles } from "../../assets/styles/chat";
 
 export default function ChatUser({ name, message, avatar }) {
     const classes = useStyles();
     return (
         <Box className={classes.chatMessageRoot}>
             <Box className={classes.chatUser}>
                 <img src={avatar} width={50} height={50} alt="" className={classes.avatar} />
                 <div>
                     <Typography className={classes.chatName}>{name}</Typography>
                     <Typography className={classes.chatPreview}>{message}</Typography>
                 </div>
             </Box>
         </Box>
     );
 }