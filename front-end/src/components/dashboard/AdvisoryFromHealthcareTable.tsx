import {Component} from "react";
import {Box} from "@material-ui/core"
import {HealthAdviseTable} from '../healthadvisetable/HealthAdviseTableComponent';
import '../../App.css';

export class AdvisoryFromHealthcareTable extends Component {

    render(){
        return(
            <div className="dashboard-tableContainer-div">
                <h2>Advisory from healthcare department</h2>
                <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                    <Box p={1} m={1} bgcolor="white.100">
                        <HealthAdviseTable />
                    </Box>
                </Box>
            </div>
        );
    }
}