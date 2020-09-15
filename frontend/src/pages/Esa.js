import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import {Subject} from '../components/Subject'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%"
    },
    paper: {
        minWidth: 300,
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        },
        [theme.breakpoints.up('sm')]: {
            width: "32%",
        },
    },
    heading: {
        textAlign: "center",
        fontWeight: "bold"
    },
}));

export const Esa = () => {
    const classes = useStyles();
    const [results, setResults] = React.useState(null);

    return (
        <Grid container justify="center" spacing={2} className={classes.root}>
            <Grid item className={classes.paper}>
                <Typography className={classes.heading}>Hauptfächer</Typography>
                <Subject title="Deutsch" hasEsa={true} />
                <Subject title="Mathe" hasEsa={true} />
                <Subject title="Englisch" hasEsa={true} />
            </Grid>
            <Grid item className={classes.paper}>
                <Typography className={classes.heading}>Nebenfächer</Typography>
                <Subject title="Biologie" hasEsa={false} />
                <Subject title="Sport" hasEsa={false} />
                <Subject title="Kunst" hasEsa={false} />
                <Subject title="Physik" hasEsa={false} />
                <Subject title="Chemie" hasEsa={false} />
            </Grid>
            <Grid item className={classes.paper}>
                <Typography className={classes.heading}>Ergebnis</Typography>
            </Grid>
        </Grid>
    );
}