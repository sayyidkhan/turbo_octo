import {Route, Switch} from "react-router";
import * as React from "react";
import Home from "./pages/Home";
import About from "./pages/About";


export default function Routes() {
    //add all new routing here
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
        </Switch>
    )
}