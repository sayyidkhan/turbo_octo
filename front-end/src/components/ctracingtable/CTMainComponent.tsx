import React, {Component, useState} from "react";
import {Box} from "@material-ui/core";
import SearchNRIC from "../searchnric/CTSearchNRICComponent";
import {V2_CTTable} from "./V2_CTTableComponent";


export default class CTMainComponent extends Component {

    state = {
        myList : [],
    }

    setList = (c_tracing: []) => {
        this.setState({myList : c_tracing});
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
                        <SearchNRIC callback_function={this.setList}/>
                    </div>
                </div>

                <div className="dashboard-tableContainer-div">
                    <h2>Contact tracing records</h2>
                    <div className="searchtable-typical-content-div">
                        <Box justifyContent="center" m={1} p={0} bgcolor="background.paper">
                            <Box p={1} m={1} bgcolor="white.100">
                                <V2_CTTable list_result={this.getList()}/>
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        );

    }
}