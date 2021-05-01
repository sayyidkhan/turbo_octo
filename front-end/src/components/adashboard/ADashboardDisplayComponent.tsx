import {Component} from "react";
import {AlertsTable} from './ADashboardTableComponent';
import {CTTable} from './CTTableComponent';
import {Box} from "@material-ui/core"
import './adashboard.css';

export class AdminDashboard extends Component {
    render() {
        return (
            <div className="admin-container">
                <div className="admin-tableContainer-div">
                    <h2>Advisory from healthcare department</h2>
                    <Box justifyContent="center" m={1} p={1} bgcolor="background.paper">
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
    
                <div className="admin-tableContainer-div">
                    <h2>Recent citizen checked-in</h2>
                    <Box justifyContent="center" m={1} p={1} bgcolor="background.paper">
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
    
                <div className="admin-tableContainer-div">
                    <h2>Recent vaccinated citizen</h2>
                    <Box justifyContent="center" m={1} p={1} bgcolor="background.paper">
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
    
                <div className="admin-tableContainer-div">
                    <h2>Recent issued public alerts</h2>
                    <Box justifyContent="center" m={1} p={1} bgcolor="background.paper">
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
            </div>
        )
    }
}