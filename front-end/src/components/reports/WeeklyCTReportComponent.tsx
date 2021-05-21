import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Reports.css';


interface ReportColumn {
    id: 'week' | 'north' | 'south' | 'east' | 'west' | 'total_amount';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: ReportColumn[] = [
    { id: 'week', label: 'Week', minWidth: 150 },
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

export default class WeeklyCTReportComponent extends Component<IProps, IState> {

    state = {
        type: 'empty',
        keys: '',
        data: ''
    }

    createRows() : { week: string, north: number, south: number, east: number, west: number, total_amount: number}[] {

        const jsonData = this.state.data;
        var dataRows : any = [];
        Object.keys(jsonData).forEach(function(key:any) {
            var value : any = jsonData[key];
            var keyJson = {'week': key};
            var completeData = Object.assign({}, keyJson, value);
            dataRows.push(completeData);
        });

        const result = dataRows.map((data: { week: string; north: number; south: number; east: number; west: number; total_amount: number; }) => this.createData(data));
        return (dataRows.length !== 0) ? result : [];
    }

    createData(parameters: { week: string, north: number, south: number, east: number, west: number, total_amount: number}) {
        let {week, north, south, east, west, total_amount} = parameters;
        return { week, north, south, east, west, total_amount };
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
        if(this.state.type !== "empty" && this.state.keys.length !== 0){
            return(
                <div>
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.week}>
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