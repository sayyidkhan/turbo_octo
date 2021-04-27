import {Route, Switch} from "react-router";
import * as React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";


export default function Routes() {
    //add all new routing here
    return (
        <Switch>
            <Route path="/Home" exact component={Home} />
            <Route path="/Login" component={Login} />
            <Route path="/EnterLocation" />
            <Route path="/CheckVaccCert" />
            <Route path="/Dashboard" />
            <Route path="/ContactTracing" />
            <Route path="/VaccinationRecords" />
            <Route path="/PublicAlerts" />
            <Route path="/Reports" />
            <Route path="/ManageAccounts" />
        </Switch>
    )
}