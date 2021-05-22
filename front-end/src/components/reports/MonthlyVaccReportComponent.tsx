import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ArgumentAxis, ValueAxis, BarSeries, Chart } from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './Reports.css';

interface IDataItem {
  month: string,
  total_amount: number,
}

let chartData: IDataItem[] = [];
  
interface ReportColumn {
    id: 'month' | 'total_amount';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: ReportColumn[] = [
    { id: 'month', label: 'Month', minWidth: 150 },
    { id: 'total_amount', label: 'Total', minWidth: 150 }
];

interface IProps {
    reportRes : any;
}

interface IState {
}


export default class MonthlyVaccReportComponent extends React.Component<IProps, IState> {

    state = {
        type: 'empty',
        keys: '',
        data: '',
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
        chartData = [];
    }

    createRows() : { month: string, total_amount: number}[] {

        const jsonData = this.state.data;
        var dataRows : any = [];
        Object.keys(jsonData).forEach(function(key:any) {
            var value : any = jsonData[key];
            var keyJson = {'month': key};
            var completeData = Object.assign({}, keyJson, value);
            dataRows.push(completeData);
        });

        const result = dataRows.map((data: { month: string; total_amount: number; }) => this.createData(data));
        return (dataRows.length !== 0) ? result : [];
    }

    createData(parameters: { month: string,  total_amount: number}) {
        let {month, total_amount} = parameters;

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
        
        chartData.push({'month': month, 'total_amount': total_amount});

        return { month, total_amount };
    }

    public render(): React.ReactNode {

        const type = this.state.type;

        if(type !== "empty" && this.state.keys.length !== 0){
            return (
                <div>

                    <div>
                        <h2>Monthly Vaccination Report from {type.substring(3,13)} to {type.substring(13,23)}</h2>
                        <Paper>
                            <Chart data={chartData} >
                            <ValueScale name="total_amount" />

                            <ArgumentAxis />
                            <ValueAxis scaleName="total_amount" showGrid={false} showLine={true} showTicks={true} />

                            <BarSeries
                                name="Total"
                                valueField="total_amount"
                                argumentField="month"
                                scaleName="total_amount"
                            />
                            </Chart>
                        </Paper>
                    </div>
               
                    <div className="small-table">
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

                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }
}

// https://codesandbox.io/s/65y0l?file=/demo.tsx:831-841