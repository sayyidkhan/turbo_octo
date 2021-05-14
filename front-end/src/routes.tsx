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
import PublicAlerts from "./pages/PublicAlerts";
import TriggerAlert from "./pages/TriggerAlert";
import UpdateCovidStatus from "./pages/UpdateCovidStatus";
import Reports from "./pages/Reports";
import Accounts from "./pages/Accounts";
import NoAccessMsg from "./pages/NoAccessMsg";
import { EnterLoc } from "./pages/EnterLoc";
import { EnterLocComponent } from "./components/enterloc/EnterLocComponent";

export default function Routes(props: any) {

    function isUserAuthenticated(page : any){

        const userType = sessionStorage.getItem('userType');
        const publicAccess = ["Home", "Login"];
        const governmentAccess = ["Dashboard", "ContactTracing", "VaccinationRecords", "PublicAlerts", "Reports", "Accounts"];
        const businessAccess = ["Dashboard", "PublicAlerts"];
        const healthcareAccess = ["Dashboard", "ContactTracing", "VaccinationRecords", "TriggerAlert", "UpdateCovidStatus"];

        if(userType == "public" && publicAccess.includes(page)){
            return true;
        } else if (userType == "government" && governmentAccess.includes(page)){
            return true;
        } else if (userType == "business" && businessAccess.includes(page)){
            return true;
        } else if (userType == "healthcare" && healthcareAccess.includes(page)){
            return true;
        }

        return false;
    }

    return (
        <Switch>
            <Route path="/" exact render= {() => {return isUserAuthenticated("Home") ? <Home/> : <NoAccessMsg/>}}/>
            <Route path="/Login" render= {() => {return isUserAuthenticated("Login") ? <Login/> : <NoAccessMsg/>}}/>
            <Route path="/about" component={About} />
            <Route path="/EnterLocation"  component={EnterLoc}/>
            <Route path="/locationList" component={LocationList}/>
            <Route path="/CheckVaccCert" />
            <Route path="/Dashboard" render= {() => {return isUserAuthenticated("Dashboard") ? <Dashboard/> : <NoAccessMsg />}} />
            <Route path="/ContactTracing" render= {() => {return isUserAuthenticated("ContactTracing") ? <ContactTracing/> : <NoAccessMsg/>}} />
            <Route path="/VaccinationRecords" render= {() => {return isUserAuthenticated("VaccinationRecords") ? <VaccinationRecords/> : <NoAccessMsg/>}} />
            <Route path="/PublicAlerts" render= {() => {return isUserAuthenticated("PublicAlerts") ? <PublicAlerts/> : <NoAccessMsg/>}} />
            <Route path="/TriggerAlert" render= {() => {return isUserAuthenticated("TriggerAlert") ? <TriggerAlert/> : <NoAccessMsg/>}} />
            <Route path="/UpdateCovidStatus" render= {() => {return isUserAuthenticated("UpdateCovidStatus") ? <UpdateCovidStatus/> : <NoAccessMsg/>}} />
            <Route path="/Reports" render= {() => {return isUserAuthenticated("Reports") ? <Reports/> : <NoAccessMsg/>}} />
            <Route path="/Accounts" render= {() => {return isUserAuthenticated("Accounts") ? <Accounts/> : <NoAccessMsg/>}} />
        </Switch>
    )
}

//https://stackoverflow.com/questions/45429963/onenter-prop-in-react-router-v4/45430656#45430656