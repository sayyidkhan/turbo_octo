import {Component} from "react";
import {LocationListComponent} from "../components/location/LocationListComponent";
import {Box} from "@material-ui/core";


export default class LocationList extends Component {
    render() {
        return (
            <div className="home-container">
                <div className="home-public-header-div">
                    <h1>Location List</h1>
                </div>

                <Box justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} m={1} bgcolor="grey.100">
                        <LocationListComponent/>
                    </Box>
                </Box>
            </div>
        )
    }
}