import {
    Box,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    table: {
        minWidth: 800,
    },
    paper: {
        height: 300,
        width: '100%',
        overflow: 'auto',
    },
});

function createData(parameters: { alertTitle: string, alertDetail: string, alertDate: number, active: boolean, location_id: number }) {
    let {alertTitle, alertDetail, alertDate, active, location_id} = parameters;
    return { alertTitle: alertTitle, alertDetail: alertDetail, alertDate: alertDate, active: active, location_id: location_id };
}

export function TabularData(props : any) {
    const classes = useStyles();

    function createRows() : { alertTitle: string, alertDetail: string, alertDate: number, active: boolean, location_id: number }[] {
        const myListing : any[] = props.myList;
        const result = myListing.map(data => createData(data));
        return (myListing.length !== 0) ? result : [];
    }

    return (
        <Box m={1} p={1}>
            <TableContainer component={Paper} className={classes.paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Alerts</TableCell>
                            <TableCell align="left">Details</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Location</TableCell>
                            <TableCell align="left">Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {createRows().map((row) => (
                            <TableRow key={row.alertTitle}>

                                <TableCell align="left">{row.alertTitle}</TableCell>
                                <TableCell align="left">{row.alertDetail}</TableCell>
                                <TableCell align="left">{row.alertDate}</TableCell>
                                <TableCell align="left">{row.active}</TableCell>
                                <TableCell align="left">{row.location_id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export function HomeAlertsTable(props: any) {
    const listing = props.myList;
    const noItemToDisplay = (
        <Box display="flex" width="100%" height="100px" bgcolor="lightgrey">
            <Box m="auto">
                Database is empty!
            </Box>
        </Box>
    );
    return (listing.length !== 0 ) ? <TabularData myList={listing} /> : noItemToDisplay;
}