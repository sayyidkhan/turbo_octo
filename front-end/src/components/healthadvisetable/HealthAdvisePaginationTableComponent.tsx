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
import './healthadvisetable.css';

interface AlertColumn {
    id: 'date' | 'location_id' | 'description' | 'e_nric';
    label: string;
    minWidth?: number;
    align?: 'left';
    format?: (value: number) => string;
}

const columns: AlertColumn[] = [
    { id: 'date', label: 'Reported date', minWidth: 80 },
    { id: 'location_id', label: 'Location', minWidth: 80 },
    { id: 'description', label: 'Details', minWidth: 200 },
    { id: 'e_nric', label: 'Reported by', minWidth: 60 },
];

function checkBoolean(x: boolean) {
    if (x==true)
    {
        return "Yes";
    }
    else
    {
        return "Yes";
    }
}

/* slice and get top 20 only */
function sliceArray(arr1: any[]) {
    if(arr1.length > 20)
    {
        return arr1.slice(1).slice(-20);
    }
    else 
    {
        return arr1;
    }
}

function createData(parameters: { date: string, location_id: number, description: string, e_nric: string }) {
    let {date, location_id, description, e_nric} = parameters;

    return { date: date, location_id: location_id, description: description, e_nric: e_nric };
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function HealthAdvisePaginationTableComponent(props : any) {
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

    function createRows() : { date: string, location_id: number, description: string, e_nric: string }[] {
        const myListing : any[] = props.myList;
        const result = myListing.map(data => createData(data));
        const slicedResults = sliceArray(result);
        return (myListing.length !== 0) ? slicedResults : [];
    }

    /*
    {classes.root}
    {classes.container}
    */
    return (
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
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
    );
}
