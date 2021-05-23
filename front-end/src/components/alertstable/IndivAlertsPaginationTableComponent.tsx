import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './alertstable.css';
import {DateUtil} from "../../util/DateUtil";

interface AlertColumn {
    id: 'alertTitle' | 'alertDetail' | 'alertDate' | 'active' | 'location_name';
    label: string;
    minWidth?: number;
    align?: 'left';
    format?: (value: number) => string;
}

const columns: AlertColumn[] = [
    { id: 'alertDate', label: 'Reported date', minWidth: 80 },
    { id: 'location_name', label: 'Location', minWidth: 80 },
    { id: 'alertDetail', label: 'Details', minWidth: 200 },
    { id: 'alertTitle', label: 'Alert', minWidth: 60 },
    { id: 'active', label: 'Active', minWidth: 80 },
];

function checkBoolean(x: boolean) {
    if (x===true)
    {
        return "Yes";
    }
    else
    {
        return "No";
    }
}

function createData(parameters: { alertTitle: string, alertDetail: string, alertDate: string, active: boolean, location_name: string, alertListId: number }) {
    let {alertTitle, alertDetail, alertDate, active, location_name, alertListId} = parameters;

    return { alertTitle: alertTitle, alertDetail: alertDetail, alertDate: DateUtil.formatDate(alertDate), active: checkBoolean(active), location_name: location_name, alertListId: alertListId };
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function IndivAlertsPaginationTableComponent(props : any) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function createRows() : { alertTitle: string, alertDetail: string, alertDate: number, active: string, location_name: string, alertListId: number }[] {
        const myListing : any[] = props.myList;
        const result = myListing.map(data => createData(data));
        return (myListing.length !== 0) ? result : [];
    }

    return (
        <div>
            <div style={{'display': 'none'}}>{props.renderStatus}</div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {createRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row ) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.alertListId}>
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
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={createRows().length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );

}