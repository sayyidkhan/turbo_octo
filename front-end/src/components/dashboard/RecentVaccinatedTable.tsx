import {Component} from "react";
import {Box} from "@material-ui/core"
import {AlertsTable} from '../alertstable/AlertsTableComponent';
import '../../App.css';

export class RecentVaccinatedTable extends Component {

    render(){
        return(
            <div className="dashboard-tableContainer-div">
                <h2>Recent vaccinated citizen</h2>
                <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                    <Box p={1} m={1} bgcolor="white.100">
                        <AlertsTable />
                    </Box>
                </Box>
            </div>
        );
    }
}