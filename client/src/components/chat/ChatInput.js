/**
 * Chat Input
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { useStyles } from "../../assets/styles/chat";
import Button from "@material-ui/core/Button";

export default function ChatInput() {
    const [message, setMessage] = React.useState("");
    const classes = useStyles();

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <Box className={classes.chatInput}>
            <TextField
                id="message"
                fullWidth
                margin="normal"
                InputProps={{
                    disableUnderline: true,
                    classes: { input: classes.inputs,  },
                    endAdornment: (
                      <Button className={classes.send}>
                        Send
                      </Button>
                    )
                  }}
                name="message"
                autoFocus
                placeholder="Type something..."
                value={message}
                onChange={handleChange}
            />
        </Box>
    );
}