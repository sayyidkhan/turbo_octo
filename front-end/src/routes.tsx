import {Route, Switch} from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LocationList from "./pages/LocationList";
import Dashboard from "./pages/Dashboard";
import ContactTracing from "./pages/ContactTracing";
import VaccinationRecords from "./pages/VaccinationRecords";
import PublicAlerts from "./pages/PublicAlerts";
import TriggerAlert from "./pages/TriggerAlert";
import UpdateCovidStatus from "./pages/UpdateCovidStatus";
import Reports from "./pages/Reports";
import Accounts from "./pages/Accounts";
import NoAccessMsg from "./pages/NoAccessMsg";
import EnterLoc from "./pages/EnterLoc";
import VaccCert from "./pages/VaccCert";

export default function Routes(props: any) {

    function isUserAuthenticated(page : any){

        const userType = sessionStorage.getItem('userType');
        const publicAccess = ["Home", "Login"];
        const governmentAccess = ["Dashboard", "ContactTracing", "VaccinationRecords", "PublicAlerts", "Reports", "Accounts"];
        const businessAccess = ["Dashboard", "PublicAlerts"];
        const healthcareAccess = ["Dashboard", "ContactTracing", "VaccinationRecords", "TriggerAlert", "UpdateCovidStatus"];

        if(userType === "P" && publicAccess.includes(page)){
            return true;
        } else if (userType === "G" && governmentAccess.includes(page)){
            return true;
        } else if (userType === "B" && businessAccess.includes(page)){
            return true;
        } else if (userType === "H" && healthcareAccess.includes(page)){
            return true;
        }

        return false;
    }

    return (
        <Switch>
            <Route path="/" exact render= {() => {return isUserAuthenticated("Home") ? <Home/> : <NoAccessMsg/>}}/>
            <Route path="/Login" render= {() => {return isUserAuthenticated("Login") ? <Login/> : <NoAccessMsg/>}}/>
            <Route path="/EnterLocation"  component={EnterLoc}/>
            <Route path="/locationList" component={LocationList}/>
            <Route path="/CheckVaccCert" component={VaccCert}/>
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