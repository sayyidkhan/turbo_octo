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
  week: string,
  total_amount: number,
}

let chartData: IDataItem[] = [];
  
interface ReportColumn {
    id: 'week' | 'total_amount';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: ReportColumn[] = [
    { id: 'week', label: 'Week', minWidth: 150 },
    { id: 'total_amount', label: 'Total', minWidth: 150 }
];

interface IProps {
    reportRes : any;
}

interface IState {
}


export default class WeeklyVaccReportComponent extends React.Component<IProps, IState> {

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

    createRows() : { week: string, total_amount: number}[] {

        const jsonData = this.state.data;
        var dataRows : any = [];
        Object.keys(jsonData).forEach(function(key:any) {
            var value : any = jsonData[key];
            var keyJson = {'week': key};
            var completeData = Object.assign({}, keyJson, value);
            dataRows.push(completeData);
        });

        const result = dataRows.map((data: { week: string; total_amount: number; }) => this.createData(data));
        return (dataRows.length !== 0) ? result : [];
    }

    createData(parameters: { week: string,  total_amount: number}) {
        let {week, total_amount} = parameters;

        switch(week.toString()){
            case "1": week = "Week 1"; break;
            case "2": week = "Week 2"; break;
            case "3": week = "Week 3"; break;
            case "4": week = "Week 4"; break;
            default: week = "Week 1"; 
        }
        
        chartData.push({'week': week, 'total_amount': total_amount});

        return { week, total_amount };
    }

    monthToString(month : string){
        switch(month){
            case "01": return "Jan"; 
            case "02": return "Feb"; 
            case "03": return "Mar"; 
            case "04": return "Apr"; 
            case "05": return "May"; 
            case "06": return "Jun"; 
            case "07": return "Jul"; 
            case "08": return "Aug"; 
            case "09": return "Sep"; 
            case "10": return "Oct"; 
            case "11": return "Nov"; 
            case "12": return "Dec"; 
            default: return "Jan"; 
        }
    }

    public render(): React.ReactNode {

        const type = this.state.type;

        if(type !== "empty" && this.state.keys.length !== 0){
            return (
                <div>
                    <div>
                        <h2>Weekly Vaccination Report for {this.monthToString(type.slice(-2))} {type.substring(3,7)}</h2>
                        <Paper>
                            <Chart data={chartData} >
                            <ValueScale name="total_amount" />

                            <ArgumentAxis />
                            <ValueAxis scaleName="total_amount" showGrid={false} showLine={true} showTicks={true} />

                            <BarSeries
                                name="Units Sold"
                                valueField="total_amount"
                                argumentField="week"
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