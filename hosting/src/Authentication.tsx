/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import AccountIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useTheme } from "@material-ui/core/styles";
import { Google as GoogleIcon } from "./Google";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDXfx6vYZP7muzM1c3CNAcKSffGsjj_E4Q",
  authDomain: "graphen-ea3be.firebaseapp.com",
  // databaseURL: "https://graphen-ea3be.firebaseio.com",
  // projectId: "graphen-ea3be",
  // storageBucket: "graphen-ea3be.appspot.com",
  // messagingSenderId: "426713470051",
  // appId: "1:426713470051:web:245763bef2bb6a8e985456",
  // measurementId: "G-JBW4DSSESD",
});
// const uiConfig = {
//   signInFlow: "popup",
//   // signInSuccessUrl: "/signedIn",
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   ],
//   callbacks: {
//     signInSuccessWithAuthResult: () => false,
//   },
// };
const auth = app.auth();
const providers = [
  {
    provider: new firebase.auth.GoogleAuthProvider(),
    name: "Google",
    icon: <GoogleIcon />,
  },
  {
    provider: new firebase.auth.GithubAuthProvider(),
    name: "GitHub",
    icon: <GitHubIcon />,
  },
  {
    provider: new firebase.auth.FacebookAuthProvider(),
    name: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    provider: new firebase.auth.TwitterAuthProvider(),
    name: "Twitter",
    icon: <TwitterIcon />,
  },
];

export const Authentication = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged:", user);
      setUser(user);
    });
    return () => {
      unregisterAuthObserver();
    };
  });

  return (
    <Fragment>
      <IconButton color="inherit" onClick={() => setOpened(true)}>
        {user ? (
          user.photoURL ? (
            <Avatar css={{ width: 24, height: 24 }} src={user.photoURL} />
          ) : (
            <Avatar>
              css={{ width: 24, height: 24 }}
              {user.displayName ? user.displayName.charAt(0) : ""}
            </Avatar>
          )
        ) : (
          <AccountIcon />
        )}
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={opened}
        onOpen={() => setOpened(true)}
        onClose={() => {
          setError(null);
          setOpened(false);
        }}
      >
        <div
          css={{
            width: 250,
          }}
        >
          {user ? (
            <List>
              <ListItem
                button
                onClick={async () => {
                  try {
                    console.log("logout");
                    setError(null);
                    await auth.signOut();
                    setOpened(false);
                    setUser(null);
                  } catch (err) {
                    setError(err);
                  }
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItem>
            </List>
          ) : (
            <List>
              {providers.map(({ provider, name, icon }) => (
                <ListItem
                  button
                  onClick={async () => {
                    try {
                      console.log("login");
                      setError(null);
                      const { user } = await auth.signInWithPopup(provider);
                      setOpened(false);
                      setUser(user);
                    } catch (err) {
                      setError(err);
                    }
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </SwipeableDrawer>
      {error ? (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={!!error}
          autoHideDuration={6000}
        >
          <SnackbarContent
            css={{
              backgroundColor: theme.palette.error.dark,
            }}
            message={error.toString()}
          />
        </Snackbar>
      ) : null}
    </Fragment>
  );
};
