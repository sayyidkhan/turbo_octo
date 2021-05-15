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

/* Checked-in table */ 
interface CTraceColumn {
    id: 'ct_id' | 'p_nric' | 'location_id' | 'date';
    label: string;
    minWidth?: number;
    align?: 'left';
    format?: (value: number) => string;
}

const columns: CTraceColumn[] = [
    { id: 'date', label: 'Checked-in date', minWidth: 80 },
    { id: 'location_id', label: 'Location', minWidth: 80 },
    { id: 'p_nric', label: 'NRIC', minWidth: 80 },
];

function formatDate(x: any) {
    var formattedDate = x.toString();
    return formattedDate.substring(0,10);
}

function createData(parameters: { ct_id: number, p_nric: string, location_id: number, date: number}) {
    let {ct_id, p_nric, location_id, date} = parameters;
    return { ct_id: ct_id, p_nric: p_nric, location_id: location_id, date: formatDate(date) };
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

/* get top 200 rows only */
function sliceArray(arr1: any[]) {
    if(arr1.length > 200)
    {
        return arr1.slice(1).slice(-200);
    }
    else 
    {
        return arr1;
    }
}

export default function CTPagination(props : any) {
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

    function createRows() : { ct_id: number, p_nric: string, location_id: number, date: number }[] {
        const myListing1 : any[] = props.myList;
        const result = myListing1.map(data => createData(data));
        const slicedResults = sliceArray(result);
        return (myListing1.length !== 0) ? slicedResults : [];
    }

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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.ct_id}>
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