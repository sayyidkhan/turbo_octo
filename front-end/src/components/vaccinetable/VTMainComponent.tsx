import {Component} from "react";
import {Box} from "@material-ui/core";
import VTSearchNRIC from "../searchnric/VTSearchNRICComponent";
import {V2VTTable} from "./V2_VTTableComponent";


export default class VTMainComponent extends Component {

    state = {
        myList : [],
    }

    setList = (vaccines: []) => {
        this.setState({myList : vaccines});
        console.log("parent component");
        console.log(this.state.myList);;
    }

    getList: () => any[] = () => {
        return this.state.myList;
    };

    render() {
        return (
            <div className="dashboard-container">

                <div className="dashboard-tableContainer-div">
                    <h2>Search NRIC</h2>
                    <div className="account-typical-content-div">
                        <VTSearchNRIC callback_function={this.setList}/>
                    </div>
                </div>

                <div className="dashboard-tableContainer-div">
                    <h2>Vaccination records</h2>
                    <div className="searchtable-typical-content-div">
                        <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                            <Box p={1} m={1} bgcolor="white.100">
                                <V2VTTable list_result={this.getList()}/>
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        );

    }
}