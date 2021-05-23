import {Component} from "react";
import {searchAlertByDistrict_API, searchAlertByLocationId_API} from "./api/alertstable_api";
import './alertstable.css';

interface SearchNricProps {
    callback_function : Function;
}

export default class SearchAlertComponent extends Component<SearchNricProps> {

    state = {
        district: 'north',
        locationId: '',
        searchBy: 'district',
        result : [],
        actionMessage: ''
    }

    update_result(result : any) {
        this.props.callback_function(result);
    }

    onSearchResultID = async (result : any) => {

        if(result.length === 0){
            this.showErrorMsg('No result found.');
        }else{
            this.setState({'actionMessage': ''});
        }

        this.setState({result : result});
        this.update_result(result);
    }

    changeHandler = (e : any) => {
        this.setState({[e.target.name] : e.target.value});
    }

    showErrorMsg(message : string){
        const msg = (
            <p style={{'color': 'red'}}>
                {message}
            </p>
        );
        this.setState({'actionMessage': msg});
    }

    submitHandler = (e: any) => {
        e.preventDefault();

        const {district, locationId, searchBy} = this.state;

        if(searchBy === "district"){
            searchAlertByDistrict_API(district).then(res => {
                console.log(res);
                this.onSearchResultID(res.data);
            })
            .catch(err => {
                console.log(err);
                this.showErrorMsg('No result found.');
                this.update_result([]);

            });

        }else{
            searchAlertByLocationId_API(locationId).then(res => {
                console.log(res);
                this.onSearchResultID(res.data);
            })
            .catch(err => {
                console.log(err);
                this.showErrorMsg('No result found.');
                this.update_result([]);
            });
        }
    }

    queryComponent() {
        const {district, locationId, searchBy} = this.state;

        switch (searchBy) {
            case "district":
                return (
                    <select name="district" value={district} onChange={this.changeHandler}>
                            <option value="north">North</option>
                            <option value="south">South</option>
                            <option value="east">East</option>
                            <option value="west">West</option>
                    </select>
                );
            case "locationId":
                return (
                    <input type="text" name="locationId" value={locationId} onChange={this.changeHandler}/>
                );
            default:
                return <div></div>;
        }
    }

    render() {
        const {searchBy} = this.state;

        return (
            <div className="search-alert-div">
                <form onSubmit={this.submitHandler}>
                    <div>
                        <span style={{'fontWeight':'bold'}}>Search by&nbsp;&nbsp;</span>
                        <select name="searchBy" value={searchBy} onChange={this.changeHandler}>
                            <option value="district">District</option>
                            <option value="locationId">Location ID</option>
                        </select>
                        <span style={{'fontWeight':'bold'}}>&nbsp;&nbsp;:&nbsp;&nbsp;</span>

                        {this.queryComponent()}

                        <button type="submit" className="inlineBtn">Search</button>
                    </div>
                </form>
                <div>{this.state.actionMessage}</div>
            </div>
        );
    }
}