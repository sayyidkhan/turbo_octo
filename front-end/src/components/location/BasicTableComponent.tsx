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
        minWidth: 650,
    },
    paper: {
        height: 300,
        width: '100%',
        overflow: 'auto',
    },
});

function createData(parameters: { location_name: string, location_id: number, district: string }) {
    let {location_name, location_id, district,} = parameters;
    return { location_name: location_name, location_id: location_id, district: district };
}

export function TabularData(props : any) {
    const classes = useStyles();

    function createRows() : { location_name: string, location_id: number, district: string }[] {
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
                            <TableCell>Location Name</TableCell>
                            <TableCell align="right">Location ID</TableCell>
                            <TableCell align="right">District</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {createRows().map((row) => (
                            <TableRow key={row.location_id}>
                                <TableCell component="th" scope="row">
                                    {row.location_name}
                                </TableCell>
                                <TableCell align="right">{row.location_id}</TableCell>
                                <TableCell align="right">{row.district}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export function LocationTable(props: any) {
    const listing = props.myList;
    const noItemToDisplay = (
        <Box display="flex" width="100%" height="100px" bgcolor="lightgrey">
            <Box m="auto">
                No Items to display !
            </Box>
        </Box>
    );
    //return (listing.length !== 0 ) ? <TabularData myList={listing} /> : noItemToDisplay;
    return (listing.length !== 0 ) ? <TabularData myList={listing} /> : noItemToDisplay;
}