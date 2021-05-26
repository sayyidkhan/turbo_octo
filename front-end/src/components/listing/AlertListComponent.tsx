import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import React, {Component} from "react";
import {Box, Paper} from "@material-ui/core";
import {activeAlertListOnly} from "./api/activealertstable_api";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import './AlertListComponent.css';
import {DateUtil} from "../../util/DateUtil";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: '60%',
            // backgroundColor: 'white',
        },
        demo: {
            maxHeight: 500,
            overflow: 'auto',
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            /*margin: theme.spacing(1, 1, 1),*/
            marginTop: 40,
        },
        fontText: {
            color: theme.palette.secondary.main,
            '& span, & svg': {
                fontSize: '0.5rem'
            }
        }
    }),
);

function AlertListing(props: any) {
    const classes = useStyles();
    const myList = props.myList;

    const listTile = (myList : any[]) => {
        const createListTile = (listItem : any) => {
            const id = listItem.alertListId ?? "";
            const title = listItem.alertTitle ?? "";
            const description = listItem.alertDetail ?? "";
            const date = listItem.alertDate;
            const dateFormatted = DateUtil.formatDate(date);
            const location_name = listItem.location_name  ?? "";
            return (
                <Paper key={id}>
                    <ListItem>

                        <ListItemIcon>
                            <ReportProblemOutlinedIcon style={{color: "red", width: "30px", height: "30px"}}/>
                        </ListItemIcon>

                        <ListItemText
                            className={classes.fontText}
                            primary={
                                <Typography variant="h6" style={{ fontSize: '1em' }}>
                                    {title}
                                </Typography>
                            }
                            secondary={
                                <p style={{ fontSize: '0.75em' }}>
                                { description + " @ " + location_name.toUpperCase() }
                                </p>
                            }
                        />

                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" disabled>
                                <p style={{fontSize: "12px"}}>{dateFormatted}</p>
                            </IconButton>
                        </ListItemSecondaryAction>

                    </ListItem>
                </Paper>
            );
        };

        return myList.map((myDict) => {
            return createListTile(myDict);
        });
    };

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={1}
                // direction="column"
                // alignItems="center"
                justify="center"
            >
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" className={classes.title} align="center">
                        Recent Alerts
                    </Typography>
                    <div className={classes.demo}>
                        <List dense={false}>
                            {listTile(myList)}
                        </List>
                    </div>
                </Grid>

            </Grid>
        </div>
    );
}

export default class AlertListComponent extends Component {

    state = {
        result : [],
        totalLength : 0,
        status : 0
    }

    async componentDidMount() {
        await activeAlertListOnly().then(res => {
            const totalLength : number = this.getTotalLength(res.data);
            console.log(res.data);
            this.setState({result : res.data , totalLength : totalLength, status : res.status });
        }).catch(err => {
            console.log(err);
            this.setState({totalLength : "backend not connected..." , status : err.status })
        });
    }

    getTotalLength(myAlertList : any[]) : number {
        return myAlertList.length;
    }

    render() {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
            >
                <AlertListing myList={this.state.result} />
            </Box>
        );
    }
}
