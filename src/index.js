//import React from "react";

import ReactDOM from "react-dom";
import login from "./Component/login";
import Home from './Component/home';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={login} />
        <Route path="/home" component={Home} />
    </Switch>
    </BrowserRouter>, document.getElementById("root"));
