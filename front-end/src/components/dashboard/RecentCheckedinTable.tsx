import {Component} from "react";
import {Box} from "@material-ui/core"
import {CTTable} from '../ctracingtable/CTTableComponent';
import '../../App.css';

export class RecentCheckedinTable extends Component {

    render(){
        return(
            <div className="dashboard-tableContainer-div">
                <h2>Recent citizen checked-in</h2>
                <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                    <Box p={1} m={1} bgcolor="white.100">
                        <CTTable />
                    </Box>
                </Box>
            </div>
        );
    }
}