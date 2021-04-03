/**
 * Login Page
 * @author Hatchways
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
import { useStyles } from "../styles/authentication";
import AuthSidebar from "../components/AuthSidebar";

/**
 * @name useLogin
 * @description calls login api for logging in
 * @returns login information
 */
function useLogin() {
  const history = useHistory();

  const login = async (email, password) => {
    console.log(email, password);
    const res = await fetch(
      `/auth/login?email=${email}&password=${password}`
    ).then(res => res.json());
    localStorage.setItem("user", res.user);
    localStorage.setItem("token", res.token);
    history.push("/dashboard");
  };
  return login;
}

/**
 * Login page implementation
 */
export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) history.push("/dashboard");
  }, [history]);

  const login = useLogin();

  const handleClose = (event, reason) => {
    console.log(reason);
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <AuthSidebar/>
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
                email: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required("Email is required")
                  .email("Email is not valid"),
                password: Yup.string()
                  .required("Password is required")
                  .max(100, "Password is too long")
                  .min(6, "Password too short")
              })}
              onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                setStatus();
                login(email, password).then(
                  () => {
                    // useHistory push to chat
                    console.log(email, password);
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
                    id="email"
                    label={<p className={classes.label}>E-mail address</p>}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{ classes: { input: classes.inputs } }}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    value={values.email}
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
                    InputProps={{
                      classes: { input: classes.inputs },
                      endAdornment: (
                        <Typography className={classes.forgot}>
                          Forgot?
                        </Typography>
                      )
                    }}
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
          message="Login failed"
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
