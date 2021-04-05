/**
 * Login Page
 * @since 0.1.0
 */
import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Formik } from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../assets/styles/authentication";
import AuthSidebar from "../components/AuthSidebar";
const AuthService = require("../services/authService");

/**
 * Login page implementation
 */
export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
    history.push("/dashboard");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <AuthSidebar />
      <Grid item xs={12} sm={12} md={7} elevation={6} component={Paper} square>
        <Box className={classes.buttonHeader}>
          <Box p={1} alignSelf="flex-end" alignItems="center">
            <Link to="/signup" className={classes.link}>
              <Button className={classes.noAccBtn}>
                Don't have an account?
              </Button>
              <Button
                color="default"
                className={classes.accBtn}
                variant="contained"
              >
                Create account
              </Button>
            </Link>
          </Box>

          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <p className={classes.welcome} component="h1" variant="h5">
                  Welcome back!
                </p>
              </Grid>
            </Grid>
            <Formik
              initialValues={{
                username: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .required("Username is required"),
                password: Yup.string()
                  .required("Password is required")
                  .max(100, "Password is too long")
                  .min(6, "Password too short")
              })}
              onSubmit={({ username, password }, { setStatus, setSubmitting, setErrors }) => {
                setStatus();
                AuthService.login(username, password).then(
                  (res) => {
                    // useHistory push to chat
                    if(res.errors) {
                      setErrors(res.errors);
                    } else {
                      setMessage(res.message);
                      setOpen(true);
                      // redirects to dashboard
                      localStorage.setItem("user", username);
                      
                    }
                    return;
                  },
                  error => {
                    setSubmitting(false);
                    setStatus(error);
                  }
                );
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <form
                  onSubmit={handleSubmit}
                  className={classes.form}
                  noValidate
                >
                  <TextField
                    id="username"
                    label={
                      <Typography className={classes.label}>
                        Username
                      </Typography>
                    }
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{ classes: { input: classes.inputs } }}
                    name="username"
                    autoComplete="username"
                    autoFocus
                    helperText={touched.username ? errors.username : ""}
                    error={touched.username && Boolean(errors.username)}
                    value={values.username}
                    onChange={handleChange}
                  />
                  <TextField
                    id="password"
                    label={
                      <Typography className={classes.label}>
                        Password
                      </Typography>
                    }
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{ classes: { input: classes.inputs }}}
                    type="password"
                    autoComplete="current-password"
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    value={values.password}
                    onChange={handleChange}
                  />

                  <Box textAlign="center">
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Login
                    </Button>
                  </Box>

                  <div style={{ height: 95 }} />
                </form>
              )}
            </Formik>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Grid>
    </Grid>
  );
}
