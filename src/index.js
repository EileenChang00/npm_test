//import React from "react";

import ReactDOM from "react-dom";
import login from "./Component/login";
import home from "./Component/home";
import Come from "./Component/come";
import Customer from "./Component/customer";
import Product from "./Component/product";
import Employee from "./Component/employee";
import {BrowserRouter, Switch, Route} from 'react-router-dom';



ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Customer} />
        <Route path="/login" component={login} />
        <Route path="/home" component={home} />
        <Route path="/come" component={Come} />
        <Route path="/product" component={Product} />
        <Route path="/employee" component={Employee} />
    </Switch>
    </BrowserRouter>, document.getElementById("root"));
