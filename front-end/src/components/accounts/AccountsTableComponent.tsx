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
}

interface IState {
}

export class AccountsTableComponent extends Component<IProps, IState> {

    state = {
        loadingStatus: true,
        status: 0,
        totalRow: 0,
        result: []
    }

    sendData = (selected_nric : string) => {
        this.props.getNric(selected_nric);
    }

    async componentDidMount() {
        await getAccounts_API().then(res => {
            const totalRow : number = this.getTotalRow(res.data);
            this.setState({result : res.data , totalRow : totalRow, status : res.status });
        }).catch(err => {
            console.log(err);
            this.setState({totalRow : "backend not connected..." , status : err.status })
        });
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
