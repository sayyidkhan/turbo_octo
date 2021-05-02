import {Route, Switch} from "react-router";
import * as React from "react";
import Home from "./pages/Home";
import {Login} from "./pages/Login";
import {LocationListComponent} from "./components/location/LocationListComponent";
import LocationList from "./pages/LocationList";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import ContactTracing from "./pages/ContactTracing";
import VaccinationRecords from "./pages/VaccinationRecords";

export default function Routes(props: any) {

    //add all new routing here
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/EnterLocation" />
            <Route path="/locationList" component={LocationList} />
            <Route path="/CheckVaccCert" />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/ContactTracing" component = {ContactTracing}/>
            <Route path="/VaccinationRecords" component = {VaccinationRecords} />
            <Route path="/PublicAlerts" />
            <Route path="/Reports" />
            <Route path="/ManageAccounts" />
        </Switch>
    )
}