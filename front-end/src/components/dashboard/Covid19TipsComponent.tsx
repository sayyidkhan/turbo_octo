import {Component} from "react";
import '../../App.css';
import mask from '../../img/mask.png';
import soap from '../../img/soap.png';
import distance from '../../img/distance.png';
import fever from '../../img/fever.png';
import taketemp from '../../img/taketemp.png';
import smartphone from '../../img/smartphone.png';

export class Covid19TipsComponent extends Component {

    render(){
        return(
            <div className="dashboard-tableContainer-div">
                <h2>Covid-19 tips from the government</h2>
                <div className = "dashboard-content-div">
                    <img src={mask} className="dashboardbusiness-img" alt="Wear mask"/>Always advise your customers to wear their mask at all times in your premise.
                    <p><img src={soap} className="dashboardbusiness-img" alt="Use hand sanitizer"/>Remind your customer to sanitize their hands before coming into your store. </p>
                    <p><img src={distance} className="dashboardbusiness-img" alt="1m distance"/>Ensure a safe distancing of 1 metre is in place at all time.</p>
                    <p><img src={smartphone} className="dashboardbusiness-img" alt="Logged in"/>Remember to verify your customer has logged in to your location before allowing them the access.</p>
                    <p><img src={taketemp} className="dashboardbusiness-img" alt="Take temperature"/>Take your customer temperature at the entrance at all times.</p>
                    <p><img src={fever} className="dashboardbusiness-img" alt="Fever"/>If your customer has a high temperature, do not allow them to enter into your store and seek medical attention immediately.</p>
                </div>
            </div>
        );
    }
}