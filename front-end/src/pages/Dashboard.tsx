import React from 'react';
import '../App.css';
import {AlertsTable} from '../components/alertstable/AlertsTableComponent';
import {CTTable} from '../components/ctracingtable/CTTableComponent';
import {Box} from "@material-ui/core"
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';
import mask from '../img/mask.png';
import soap from '../img/soap.png';
import distance from '../img/distance.png';
import fever from '../img/fever.png';
import taketemp from '../img/taketemp.png';
import smartphone from '../img/smartphone.png';

export default function Dashboard() {
    return (
        <div className="dashboard-container-general">
            <h1>Dashboard</h1>
            <div className="under-page-title-div">
                <CurrentLoginUserComponent/>
            </div>
            <div className="dashboard-container">

                {/* THIS IS FOR ADMIN */}

                <div className="dashboard-tableContainer-div">
                    <h2>Advisory from healthcare department</h2>
                    <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                        <Box p={1} m={1} bgcolor="white.100">
                            <AlertsTable />
                        </Box>
                    </Box>
                    {/*<Container>*/}
                        {/*<Paper variant="outlined" >*/}
                            {/**/}
                        {/*</Paper>*/}
                    {/*</Container>*/}
                </div>
    
                <div className="dashboard-tableContainer-div">
                    <h2>Recent citizen checked-in</h2>
                    <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                        <Box p={1} m={1} bgcolor="white.100">
                            <CTTable />
                        </Box>
                    </Box>
                    {/*<Container>*/}
                        {/*<Paper variant="outlined" >*/}
                            {/**/}
                        {/*</Paper>*/}
                    {/*</Container>*/}
                </div>
    
                <div className="dashboard-tableContainer-div">
                    <h2>Recent vaccinated citizen</h2>
                    <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                        <Box p={1} m={1} bgcolor="white.100">
                            <AlertsTable />
                        </Box>
                    </Box>
                    {/*<Container>*/}
                        {/*<Paper variant="outlined" >*/}
                            {/**/}
                        {/*</Paper>*/}
                    {/*</Container>*/}
                </div>
    
                <div className="dashboard-tableContainer-div">
                    <h2>Recent issued public alerts</h2>
                    <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                        <Box p={1} m={1} bgcolor="white.100">
                            <AlertsTable />
                        </Box>
                    </Box>
                    {/*<Container>*/}
                        {/*<Paper variant="outlined" >*/}
                            {/**/}
                        {/*</Paper>*/}
                    {/*</Container>*/}
                </div>

                {/* THIS IS FOR BUSINESS */}

                <div className="dashboard-tableContainer-div">
                    <h2>Information</h2>
                    <div className = "dashboard-content-div">
                        Your business is located at XXXX (Location need to link back to the user login location)
                        <p>There are ??? public alerts in the past 14 days.</p>
                    </div>
                </div>

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

                <div className="dashboard-tableContainer-div">
                    <h2>Recent public alerts</h2>
                    <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                        <Box p={1} m={1} bgcolor="white.100">
                            <AlertsTable />
                        </Box>
                    </Box>
                </div>

                {/* THIS IS FOR HEALTHCARE */}

                <div className="dashboard-tableContainer-div">
                    <h2>Recent citizen checked-in</h2>
                    <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                        <Box p={1} m={1} bgcolor="white.100">
                            <CTTable />
                        </Box>
                    </Box>
                </div>
    
                <div className="dashboard-tableContainer-div">
                    <h2>Recent vaccinated citizen</h2>
                    <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                        <Box p={1} m={1} bgcolor="white.100">
                            <AlertsTable />
                        </Box>
                    </Box>
                </div>
    
                <div className="dashboard-tableContainer-div">
                    <h2>Recent issued public alerts</h2>
                    <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                        <Box p={1} m={1} bgcolor="white.100">
                            <AlertsTable />
                        </Box>
                    </Box>
                </div>

            </div>
        </div>
    )
}