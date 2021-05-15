import * as React from "react";
import {Component, useEffect, useState} from "react";
import {postEnterLoc_API} from "./api/enterloc_api"
import {getLocationById} from "../location/api/location_api";

interface LocationJSON {
    location_id : number,
    location_name: string,
    district : string,
}

interface ValidateLocationProps {
    location_id : string;
}

class ValidateLocation extends React.Component<ValidateLocationProps> {
    constructor(props : ValidateLocationProps) {
        super(props);
        this.setState({location_id : props.location_id});
    }

    state = {
        location_id : 0,
    };

    updateLocation: () => Promise<string | string> = async () => {
        console.log(this.state.location_id);
        const location_id = Number(this.state.location_id);
        const location: any = await getLocationById(location_id);
        console.log(location);
        if (location != null) {
            return location;
        }
        return "";
    }

    async componentDidUpdate(prevProps: Readonly<ValidateLocationProps>, prevState: Readonly<{}>, snapshot?: any) {
        const result = await this.updateLocation();
        console.log(result);
    }


    render() {
        return (
            <div>
                <h6>Currently Checking into:</h6>
                <p>{}</p>
            </div>
        );
    }
}


export class EnterLocComponent extends Component {

    constructor(props : any) {
        super(props);
    }

    state = {
        'p_nric':'',
        'location_id': '',
        'date' : null,
        //only will be used to hold the outcome of the data
        'createdAlert' : ''
    }

    onUpdateLoc = (updatedInfo : any) => {
        const result = (
            <p style={{'fontSize' : 14}}> You have successfully check in to {updatedInfo.location_id}.<br/>
            </p>
        );
        this.setState({'createdAlert' : result});
        console.log(updatedInfo);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    mapDTO = () => {
        //backend only accept this data shape
        const dto = {
            p_nric : this.state.p_nric,
            location_id : this.state.location_id,
            date : new Date(),
        };
        //purge any existing data, if there is any
        this.setState({createdAlert : ''})
        return dto;
    }

    submitHandler = (e: any) => {
        e.preventDefault();
        //map data to DTO object for sending //
        const dto  = this.mapDTO();
        console.log(dto);
        //map data to DTO object for sending //
        postEnterLoc_API(dto)
            .then(res=> {
                console.log(res);
                this.onUpdateLoc(res.data);
            })
            .catch(err => {
                console.log(err);
                alert("NRIC/ Location not found")
            });
        this.setState({p_nric: '', location_id: '', date : null});
    }

    render() {
        const {p_nric, location_id} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>NRIC: </label>
                        <input type="text" name='p_nric' value={p_nric} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label>Location: </label>
                        <input type="number" name="location_id" value={location_id} onChange={this.changeHandler}/>
                    </div>
                    <ValidateLocation location_id={this.state.location_id} />
                    <button type="submit">Check-In</button>
                    <div>{this.state.createdAlert}</div>
                </form>
            </div>
        );
    }
}