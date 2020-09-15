import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: 10
    },
    formControl: {
        width: "47%",
    },
}));

export const Subject = (props) => {
    const [esaExam, setEsaExam] = React.useState('');
    const [esaOralExam, setEsaOralExam] = React.useState('');
    const [classReport, setClassReport] = React.useState('');
    const [result, setResult] = React.useState(null);
    const classes = useStyles();

    const calculateResult = () => {
        if(classReport) {
            if(props.isMainSubject && esaExam && esaOralExam) {
                let esaGrade = 0.5*esaExam + 0.5*esaOralExam;
                //esa test wird mit 40, Zeugnisnote mit 60 gewertet
                updateResult(0.4*esaGrade + 0.6*classReport)
            }
            else if(!props.isMainSubject) {
                updateResult(classReport);
            }
        }
    }

    const updateResult = (grade) => {
        setResult(grade);
        props.callback({
            "isMainSubject": props.isMainSubject,
            "subjectTitle": props.title,
            "grade": grade
        });
    }

    useEffect(() => {
        calculateResult();
    }, [esaExam, esaOralExam, classReport]);


    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    {props.title}
                </Typography>
                {props.isMainSubject &&
                    <Box display="flex" justifyContent="space-between">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="examLabel">ESA Schriftlich</InputLabel>
                            <Select
                                labelId="examLabel"
                                id="examLabelSelect"
                                value={esaExam}
                                onChange={(event) => {
                                    setEsaExam(event.target.value);
                                }}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="oralExamLabel">ESA Mündlich</InputLabel>
                            <Select
                                labelId="oralExamLabel"
                                id="oralExamSelect"
                                value={esaOralExam}
                                onChange={(event) => {
                                    setEsaOralExam(event.target.value);
                                }}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                }
                <FormControl style={{width: "100%"}}>
                    <InputLabel id="gradeLabel">Zeugnisnote</InputLabel>
                    <Select
                        labelId="gradeLabel"
                        id="gradeSelect"
                        value={classReport}
                        onChange={(event) => {
                            setClassReport(event.target.value);
                        }}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                    </Select>
                </FormControl>

                {props.isMainSubject && result &&
                <Typography style={{marginTop: 10}}>Ergebnisnote: {(Math.round(result * 10) / 10)}</Typography>
                }
            </CardContent>
        </Card>
    );
}