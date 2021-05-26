import {Component} from "react";
import {Box} from "@material-ui/core";
import VTSearchNRIC from "../searchnric/VTSearchNRICComponent";
import {V2VTTable} from "./V2_VTTableComponent";
import './vaccinetable.css'

export default class VTMainComponent extends Component {

    state = {
        myList : [],
    }

    setList = (vaccines: []) => {
        this.setState({myList : vaccines});
        console.log(this.state.myList);;
    }

    getList: () => any[] = () => {
        return this.state.myList;
    };

    render() {
        return (
            <div className="vaccine-tableContainer-div">

                <div>
                    <h2>Search Vaccination Records by NRIC</h2>
                    <div className="account-typical-content-div">
                        <VTSearchNRIC callback_function={this.setList}/>
                    </div>
                </div>

                <div>
                    <h3 style={{'paddingLeft':'20px'}}>Vaccination Records</h3>
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