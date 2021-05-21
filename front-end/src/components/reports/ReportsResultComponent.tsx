import { Component } from 'react';
import './Reports.css';
import MonthlyCTReportComponent from './MonthlyCTReportComponent';
import WeeklyCTReportComponent from './WeeklyCTReportComponent';

interface IProps {
    reportRes : any;
}

interface IState {
}

export class ReportsResultComponent extends Component<IProps, IState> {

    state = {
        type: 'empty'
    }

    async componentDidUpdate() {
        if(this.state.type !== this.props.reportRes.type) {
            await this.componentDidMount();
        }
    }

    async componentDidMount() {
        this.setState({
            type: this.props.reportRes.type
        });
    }

    render() {

        const {type} = this.state;

        if(type !== "empty" && type !== undefined){

            switch(type.substring(0,3)){
                case "MCT":{
                    return(
                        <MonthlyCTReportComponent reportRes={this.props.reportRes}/>
                    );
                }
                case "WCT":{
                    return(
                        <WeeklyCTReportComponent reportRes={this.props.reportRes}/>
                    );
                }
                case "MVA":{
                    return(
                        <MonthlyCTReportComponent reportRes={this.props.reportRes}/>
                    );
                }
                case "WVA":{
                    return(
                        <MonthlyCTReportComponent reportRes={this.props.reportRes}/>
                    );
                }
            }
            
        }else{
            return(
                <div></div>
            );
        }
        
    }
}