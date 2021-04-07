/**
 * Chat Input
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Button, Box, TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  send: {
    marginTop: "-0.2rem",
    fontSize: "15px",
    paddingRight: 10,
    color: "#3a8dff"
  },
  inputs: {
    marginTop: "-0.2rem",
    fontSize: "15px",
    fontWeight: "600",
    color: "#99A9C4"
  },
  chatInput: {
    margin: theme.spacing(2),
    height: "5rem",
    padding: "0.5rem 2rem",
    borderRadius: "10px",
    background: "#E9EEF9"
  }
}));

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
          classes: { input: classes.inputs },
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