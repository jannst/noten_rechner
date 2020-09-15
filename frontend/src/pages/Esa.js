import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import {Subject} from '../components/Subject';
import {Results} from '../components/Results';

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
    const [results, setResults] = React.useState({
        "main_subjects": {},
        "minor_subjects": {}
    });

    const handleResultChange = (result) => {
        let newResults = Object.assign({}, results);
        if(result.isMainSubject) {
            let grade = result.grade;
            if(grade < Math.floor(grade)+0.5) {
                grade = Math.floor(grade);
            } else {
                grade = Math.ceil(grade);
            }
            newResults.main_subjects[result.subjectTitle] = grade;
        } else {
            newResults.minor_subjects[result.subjectTitle] = result.grade;
        }
        setResults(newResults);
    }

    return (
        <Grid container justify="center" spacing={2} className={classes.root}>
            <Grid item className={classes.paper}>
                <Typography className={classes.heading}>Hauptfächer</Typography>
                <Subject title="Deutsch" isMainSubject={true} callback={handleResultChange}/>
                <Subject title="Mathe" isMainSubject={true} callback={handleResultChange}/>
                <Subject title="Englisch" isMainSubject={true} callback={handleResultChange}/>
            </Grid>
            <Grid item className={classes.paper}>
                <Typography className={classes.heading}>Nebenfächer</Typography>
                <Subject title="Biologie" isMainSubject={false} callback={handleResultChange}/>
                <Subject title="Sport" isMainSubject={false} callback={handleResultChange}/>
                <Subject title="Kunst" isMainSubject={false} callback={handleResultChange}/>
                <Subject title="Physik" isMainSubject={false} callback={handleResultChange}/>
                <Subject title="Chemie" isMainSubject={false} callback={handleResultChange}/>
            </Grid>
            <Grid item className={classes.paper}>
                <Typography className={classes.heading}>Ergebnis</Typography>
                <Results results={results} />
            </Grid>
        </Grid>
    );
}