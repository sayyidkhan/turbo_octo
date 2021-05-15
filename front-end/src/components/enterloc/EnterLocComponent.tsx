import * as React from "react";
import {Component} from "react";
import {postEnterLoc_API} from "./api/enterloc_api"
import {getAllLocations} from "../location/api/location_api";

interface LocationJSON {
    location_id : number,
    location_name: string,
    district : string,
}

/*interface ValidateLocationProps {
    location_id : string;
}*/

function ValidateLocation(props : any) {

    const locationDict : any = props.locationDict;
    const locationId : string  = props.location_id;

    const displayLocationName = () => {
        if(locationId.length === 6) {
            const result = (locationDict[locationId] === undefined) ? "" : locationDict[locationId];
            return result;
        }
        return "";
    }

    return (
        <div>
            <h4>Currently Checking into:</h4>
            <p>{displayLocationName()}</p>
        </div>
    );
}


export class EnterLocComponent extends Component {

    state = {
        'p_nric':'',
        'location_id': '',
        'date' : null,
        //only will be used to hold the outcome of the data
        'createdAlert' : '',
        //hold locationDict
        locationDict : {},
    }

    onUpdateLoc = (updatedInfo : any) => {
        const locationDict : any = this.state.locationDict;
        const locationId : string = updatedInfo.location_id.toString();

        const displayLocationName = () => {
            if(locationId.length === 6) {
                const id = Number(locationId);
                const result = (locationDict[id] === undefined) ? "" : locationDict[id];
                return result;
            }
            return "";
        }

        const result = (
            <p style={{'fontSize' : 14}}>
                You have successfully check in to <br/>
                <b style={{color  : 'green'}}>{displayLocationName()}</b>
            </p>
        );
        this.setState({'createdAlert' : result});
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    onHandleChangeNumeric = (e : any) => {
        function isNumeric(number : number) : boolean {
            if (!isNaN(number)) { // if is a number
                return true;
            }

            return false;
        }

        const value = e.target.value;
        if(isNumeric(value)) {
            this.setState({[e.target.name] : e.target.value});
        }
        else {
            //do nothing
        }

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
        //map data to DTO object for sending //
        postEnterLoc_API(dto)
            .then(res=> {
                this.onUpdateLoc(res.data);
            })
            .catch(err => {
                alert("NRIC/ Location not found")
            });
        this.setState({p_nric: '', location_id: '', date : null});
    }


    async componentWillMount() {
        function morphListToDict(myList : LocationJSON[]) {
            const dict: any = {};
            myList.forEach((location : LocationJSON) => {
                const locationId : number = location.location_id;
                const locationName : string = location.location_name;
                dict[locationId] = locationName;
            });
            return dict;
        }

        await getAllLocations().then(res => {
            const list = res.data;
            this.setState({locationDict : morphListToDict(list) });
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillUnmount(): void {
        this.setState({locationDict : {locations : null} });
    }


    render() {
        const {p_nric, location_id} = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>NRIC: </label>
                        <input type="text" name='p_nric' value={p_nric} onChange={this.changeHandler} maxLength={9} />
                    </div>
                    <div>
                        <label>Location: </label>
                        <input type="text" name="location_id" value={location_id} onChange={this.onHandleChangeNumeric} maxLength={6} />
                    </div>
                    <ValidateLocation location_id={this.state.location_id} locationDict={this.state.locationDict} />
                    <button type="submit">Check-In</button>
                    <div>{this.state.createdAlert}</div>
                </form>
            </div>
        );
    }
}