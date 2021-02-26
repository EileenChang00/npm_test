//import React from "react";

import ReactDOM from "react-dom";
import login from "./Component/login";
import home from "./Component/home";
import Come from "./Component/come";
import Customer from "./Component/customer";
import Product from "./Component/product";
import Employee from "./Component/employee";
import Buy from "./Component/buy";
import Service from "./Component/service";
import Reservation from "./Component/reservation";
import Firm from "./Component/firm";
import Firmstaff from "./Component/firmstaff";
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
        <Route path="/buy" component={Buy} />
        <Route path="/service" component={Service} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/firm" component={Firm} />
        <Route path="/firmstaff" component={Firmstaff} />
    </Switch>
    </BrowserRouter>, document.getElementById("root"));
