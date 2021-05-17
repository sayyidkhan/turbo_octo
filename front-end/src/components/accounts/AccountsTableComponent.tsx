import {Component} from "react";
import {getAccounts_API} from "./api/accounts_api";
import AccountsTablePaginationComponent from "./AccountsTablePaginationComponent";

function DisplayTotal(props: { status: number, totalRow: number }) {
    return <div>
        <p style={{color: (props.status === 200) ? "green" : "black"}}>Total number of accounts: {props.totalRow}</p>
    </div>;
}

interface IProps {
    getNric(e_nric:any) : any;
    listener_counter : number;
}

interface IState {
}

export class AccountsTableComponent extends Component<IProps, IState> {

    state = {
        status: 0,
        totalRow: 0,
        result: [],
        prev_listener_counter : 0,
    }

    sendData = (selected_nric : string) => {
        this.props.getNric(selected_nric);
    }

    callAPI = async () => {
        await getAccounts_API().then(res => {
            const totalRow : number = this.getTotalRow(res.data);
            this.setState({result : res.data , totalRow : totalRow, status : res.status });
        }).catch(err => {
            console.log(err);
            this.setState({totalRow : "backend not connected..." , status : err.status })
        });
    }

    async componentDidUpdate() {
        if(this.state.prev_listener_counter < this.props.listener_counter) {
            await this.componentDidMount();
            console.log("re-rendered successfully");
        }
    }

    async componentDidMount() {
        await this.callAPI();
        this.setState({ prev_listener_counter : this.props.listener_counter });
        console.log(this.props.listener_counter);
    }

    getTotalRow(rows : any[]) : number {
        return rows.length;
    } 

    render() {
        return (
            <div>
            <DisplayTotal status={this.state.status} totalRow={this.state.totalRow}/>
            <AccountsTablePaginationComponent dataRows={this.state.result} selected_nric={this.sendData}/>
            </div>
        );
    }
}
