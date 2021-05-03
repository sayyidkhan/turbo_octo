import React from 'react';
import '../App.css';
import {CTTable} from '../components/ctracingtable/CTTableComponent';
import {Box} from "@material-ui/core"
import CurrentLoginUserComponent from '../components/CurrentLoginUserComponent';

export default function Dashboard() {
    return (
        <div className="dashboard-container-general">
            <h1>Contact tracing</h1>
            <div className="under-page-title-div">
                <CurrentLoginUserComponent/>
            </div>
            <div className="dashboard-container">
    
                <div className="dashboard-tableContainer-div">
                    <h2>User checked-in</h2>
                    <div className="account-typical-content-div">
                      <p>Search by NRIC:  NEED TO INSERT FEATURE TO FILTER TABLE</p>
                    </div>
                    <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                        <Box p={1} m={1} bgcolor="white.100">
                            <CTTable />
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    )
}