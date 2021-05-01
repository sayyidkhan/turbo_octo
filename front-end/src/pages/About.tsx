import React from 'react';
import {UserListComponent} from "../components/about/UserListComponent";
import {PostUserComponent} from "../components/about/PostUserComponent";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    marginAutoContainer: {
        width: 500,
        height: 80,
        display: 'flex',
        backgroundColor: 'gold',
    },
    marginAutoItem: {
        margin: 'auto'
    },
    alignItemsAndJustifyContent: {
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        margin: "0em 2em 0em 2em",
    },
}))

export default function About() {
    const classes = useStyles();

    return (
        <div>
            <div className="home-public-header-div">
                <h1>Covid-19 TurboTrace</h1>
            </div>
            <div>
                <header className="App-header">
                    <Box m={2}>
                        <div className={classes.alignItemsAndJustifyContent}>
                            <div className={classes.marginAutoItem}>
                                <p><b>Create New User:</b></p>
                                <PostUserComponent/>
                            </div>
                        </div>
                        <p><b>User List:</b></p>
                        <UserListComponent/>
                    </Box>
                </header>
            </div>
        </div>
    )
}