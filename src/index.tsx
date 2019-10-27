import React, { ReactNode } from "react";
import { render } from "react-dom";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { App } from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: { light: "#4f5b62", main: "#263238", dark: "#000a12" },
    secondary: { light: "#ff6090", main: "#e91e63", dark: "#b0003a" },
  },
});

const Provider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const Routing = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/engines/dot/codes/new" />
      </Route>
      <Route
        exact
        path={["/engines/:engine/codes/new", "/engines/:engine/codes/:code"]}
      >
        <App />
      </Route>
    </Switch>
  </Router>
);

render(
  <Provider>
    <Routing />
  </Provider>,
  document.querySelector("#app"),
);
