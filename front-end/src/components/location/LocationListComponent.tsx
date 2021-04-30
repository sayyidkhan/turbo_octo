import React, {Component} from 'react';
import '../login/Login.css';
import axios from "axios";
import {getAllLocations} from "./api/location_api";
import {LocationTable} from "./BasicTableComponent";


function DisplayLocationNo(props: { status: number, totalNoOfLocations: number }) {
    return <div>
        <p style={{color: (props.status === 200) ? "green" : "black"}}>Total Number of
            Locations: {props.totalNoOfLocations}</p>
    </div>;
}

export class LocationListComponent extends Component {

    state = {
        loadingStatus : true,
        status : 0,
        totalNoOfLocations: 0,
        result : []
    }

    async componentDidMount() {
        await getAllLocations().then(res => {
            const totalNoOfLocations : number = this.getTotalNoOfLocations(res.data);
            this.setState({result : res.data , totalNoOfLocations : totalNoOfLocations, status : res.status });
        }).catch(err => {
            console.log(err);
            this.setState({totalNoOfLocations : "backend not connected..." , status : err.status })
        });
    }

    getTotalNoOfLocations(myLocationsList : any[]) : number {
        return myLocationsList.length;
    }

    render() {
        return(
            <div>
                <DisplayLocationNo status={this.state.status} totalNoOfLocations={this.state.totalNoOfLocations}/>
                <LocationTable myList={this.state.result}/>
            </div>
        );
    }

}

