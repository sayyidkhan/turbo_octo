import { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Reports.css';


interface ReportColumn {
    id: 'month' | 'north' | 'south' | 'east' | 'west' | 'total_amount';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: ReportColumn[] = [
    { id: 'month', label: 'Month', minWidth: 150 },
    { id: 'north', label: 'North', minWidth: 150 },
    { id: 'south', label: 'South', minWidth: 150 },
    { id: 'east', label: 'East', minWidth: 150 },
    { id: 'west', label: 'West', minWidth: 150 },
    { id: 'total_amount', label: 'Total', minWidth: 150 }
];

interface IProps {
    reportRes : any;
}

interface IState {
}

export default class MonthlyCTReportComponent extends Component<IProps, IState> {

    state = {
        type: 'empty',
        keys: '',
        data: ''
    }

    createRows() : { month: string, north: number, south: number, east: number, west: number, total_amount: number}[] {

        const jsonData = this.state.data;
        var dataRows : any = [];
        Object.keys(jsonData).forEach(function(key:any) {
            var value : any = jsonData[key];
            var keyJson = {'month': key};
            var completeData = Object.assign({}, keyJson, value);
            dataRows.push(completeData);
        });

        const result = dataRows.map((data: { month: string; north: number; south: number; east: number; west: number; total_amount: number; }) => this.createData(data));
        return (dataRows.length !== 0) ? result : [];
    }

    createData(parameters: { month: string, north: number, south: number, east: number, west: number, total_amount: number}) {
        let {month, north, south, east, west, total_amount} = parameters;
        
        switch(month){
            case "1": month = "Jan"; break;
            case "2": month = "Feb"; break;
            case "3": month = "Mar"; break;
            case "4": month = "Apr"; break;
            case "5": month = "May"; break;
            case "6": month = "Jun"; break;
            case "7": month = "Jul"; break;
            case "8": month = "Aug"; break;
            case "9": month = "Sep"; break;
            case "10": month = "Oct"; break;
            case "11": month = "Nov"; break;
            case "12": month = "Dec"; break;
            default: month = "Jan"; 
        }

        return { month, north, south, east, west, total_amount };
    }

    async componentDidUpdate() {
        if(this.state.type !== this.props.reportRes.type) {
            await this.componentDidMount();
        }
    }

    async componentDidMount() {
        this.setState({
            type: this.props.reportRes.type,
            keys: this.props.reportRes.keys,
            data: this.props.reportRes.data
        });
    }

    render() {

        const type = this.state.type;
        
        if(type !== "empty" && this.state.keys.length !== 0){
            return(
                <div>
                    <h2>Monthly Contact Tracing Report from {type.substring(3,13)} to {type.substring(13,23)}</h2>
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.createRows().map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.month}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            );
            
        }else{
            return(
                <div></div>
            );
        }
        
    }
}