import {Component} from "react";
import {healthadvise_API} from "./api/healthadvisetable_api";
import HealthAdvisePaginationTableComponent from "./HealthAdvisePaginationTableComponent";

export class HealthAdviseTable extends Component {

    state = {
        loadingStatus : true,
        status : 0,
        totalNoofAlerts: 0,
        result : []
    }

    async componentDidMount() {
        await healthadvise_API().then(res => {
            const totalNoofAlerts : number = this.gettotalNoofAlerts(res.data);
            this.setState({result : res.data , totalNoofAlerts : totalNoofAlerts, status : res.status });
            console.log(res.data)
        }).catch(err => {
            console.log(err);
            this.setState({totalNoofAlerts : "backend not connected..." , status : err.status })
        });
    }

    gettotalNoofAlerts(myAlertList : any[]) : number {
        return myAlertList.length;
    }    

    render() {
        return(
            <div>
                <HealthAdvisePaginationTableComponent myList={this.state.result}/>
            </div>
        );
    }
}