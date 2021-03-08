//import React from "react";

import ReactDOM from "react-dom";
import login from "./Component/login";
import Home from './Component/home';
import {BrowserRouter, Switch, Route} from 'react-router-dom';




ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={login} />
        <Route path="/home" component={Home} />
    </Switch>
    </BrowserRouter>, document.getElementById("root"));
