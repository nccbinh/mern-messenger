import React from 'react';
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../styles/authentication";

export default function AuthSidebar() {
    const classes = useStyles();
    return (
        <Hidden smDown>
            <Grid item xs={false} sm={false} md={5} className={classes.image}>
                <Box className={classes.overlay}>
                    <img width={67} alt="" src="/images/chatBubble.png" />
                    <Typography className={classes.heroText}>
                        Converse with anyone with any language
                    </Typography>
                </Box>
            </Grid>
        </Hidden>
    );
}