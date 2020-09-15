import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: 10,
    },
    text : {
      fontSize: 14
    },
    critical: {
        backgroundColor: "#fe9900"
    },
    warning: {
        backgroundColor: "#ffe922"
    },
    good: {
        backgroundColor: "#46a546"
    }
}));

export const Results = (props) => {
    const classes = useStyles();


    const getAverageGrade = () => {
        let grades = Object.values(props.results.main_subjects).concat(Object.values(props.results.minor_subjects));
        let sum = grades.reduce(function(pv, cv) { return pv + cv; }, 0);
        return (Math.round(sum/grades.length * 10) / 10);
    }

    //gibt meldungen zurück die bedeuten, dass der ESA nicht den eingegebenen Noten nicht bestanden werden kann
    const getCriticalProblems = () => {
        let problems = [];
        if(props.results.main_subjects["Deutsch"] === 6) {
            problems.push("Mit einer 6 im Fach Deutsch kann der ESA nicht bestanden werden");
        }
        if(props.results.main_subjects["Mathe"] === 6) {
            problems.push("Mit einer 6 im Fach Mathe kann der ESA nicht bestanden werden");
        }
        if(props.results.main_subjects["Englisch"] === 6) {
            problems.push("Mit einer 6 im Fach Englisch kann der ESA nicht bestanden werden");
        }
        if(Object.values(props.results.minor_subjects).filter((val) => {return val === 6}).length >= 2) {
            problems.push("Du hast in 2 oder mehr Nebenfächern eine 6. Damit kann der ESA nicht bestanden werden");
        }
        if(getAverageGrade() > 4) {
            problems.push("Dein Notendurchschnitt ist schlechter als 4. Damit kann der ESA nicht bestanden werden");
        }

        return problems;
    }

    let criticalProblems = getCriticalProblems();

    const containsAllNecessaryGrades = () => {
        return props.results.main_subjects["Deutsch"] &&
            props.results.main_subjects["Mathe"] &&
            props.results.main_subjects["Englisch"]
    }


    if(containsAllNecessaryGrades()) {
        return(
            <div>
                {criticalProblems.map((problem) => (
                        <Card className={[classes.card, classes.critical].join(' ')} variant="outlined">
                            <CardContent>
                                <Typography className={classes.text}>{problem}</Typography>
                            </CardContent>
                        </Card>
                ))
                }
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <Typography>Durchschnittsnote: {getAverageGrade()}</Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
    return (<div>
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography className={classes.text}>Du musst mindestens alle Noten in den Hauptfächern eintragen, um ein Ergebnis zu bekommen</Typography>
            </CardContent>
        </Card>
    </div>);
}