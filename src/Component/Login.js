import React, { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  prodErrorMap,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const password2 = useRef("");
  const email1 = useRef("");
  const email2 = useRef("");
  const password1 = useRef("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function login() {
    signInWithEmailAndPassword(
      auth,
      email1.current.value,
      password1.current.value
    )
      .then((res) => {
        document.cookie = `!@#=${res.user.uid}`;
        setMessage("User LoggedIn Successfully");
        setSeverity("success");
        setOpen(true);
        navigate("/");
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/wrong-password).") {
          setMessage("Wrong Password");
          setSeverity("error");
          setOpen(true);
        }
      });
  }
  function createAccount() {
    createUserWithEmailAndPassword(
      auth,
      email2.current.value,
      password2.current.value
    )
      .then((res) => {
        setSeverity("success");
        setMessage("Account Created Successfully");
        setOpen(true);
        async function createNewCollection() {
          try {
            await setDoc(doc(db, `${res.user.uid}`, "BookMark"), {}).then(
              (res) => {
                console.log(res);
              }
            );
          } catch (err) {
            console.log(err);
          }
        }
        createNewCollection();
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          setMessage("Already Created! Try Sign In");
          setSeverity("primary");
          setOpen(true);
        } else if (err.message === "Firebase: Error (auth/invalid-email).") {
          setMessage("Invalid EmailId Formate");
          setSeverity("warning");
          setOpen(true);
        }
      });
  }
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            width: "500px",
            m: "100px 0px",
            boxShadow: "0 0 8px 1px black",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Login" />
              <Tab label="Create Account" />
            </Tabs>
          </CardContent>
          <Divider />
          <TabPanel value={value} index={0}>
            <CardContent>Email:</CardContent>
            <CardContent>
              <TextField inputRef={email1} sx={{ width: "400px" }} />
            </CardContent>
            <CardContent>Password:</CardContent>
            <CardContent>
              <TextField
                type="password"
                inputRef={password1}
                sx={{ width: "400px" }}
              />
            </CardContent>
            <CardContent sx={{ textAlign: "center" }}>
              <Button variant="contained" onClick={login}>
                Login
              </Button>
            </CardContent>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CardContent>Email:</CardContent>
            <CardContent>
              <TextField inputRef={email2} sx={{ width: "400px" }} />
            </CardContent>
            <CardContent>Password:</CardContent>
            <CardContent>
              <TextField
                type="password"
                inputRef={password2}
                sx={{ width: "400px" }}
              />
            </CardContent>
            <CardContent sx={{ textAlign: "center" }}>
              <Button variant="contained" onClick={createAccount}>
                Create Account
              </Button>
            </CardContent>
          </TabPanel>
        </Card>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
