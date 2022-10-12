import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import Home from "../components/home";
import Login from "../components/login";



export default ({ childProps }) =>
<Router history={history}>
  <div>
    <Route  path="/rt-front/" exact component={Login}  />
    <Route  path="/rt-front/home" exact component={Home} />
  </div>
</Router>;