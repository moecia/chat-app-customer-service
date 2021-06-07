import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App.js"
import Logout from "./Logout";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/logout" component={Logout} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>, 
  document.getElementById("root")
);