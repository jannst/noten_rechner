import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {Home} from "./pages/Home";
import {Esa} from "./pages/Esa";
import {About} from "./pages/About";

const drawerWidth = 200;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: "green",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
}));

function App() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedMenuPoint, setSelectedMenuPoint] = React.useState("home");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const menuPoints = {
        "home": "Notenrechner",
        "esa": "ESA Notenrechner",
        "about": "Über den Notenrechner"
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap className={classes.title}>
                            {menuPoints[selectedMenuPoint]}
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            className={clsx(open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main className={clsx(classes.content)}>
                    <div className={classes.drawerHeader} />
                    <Route exact path="/" component={Esa} />
                    <Route exact path="/esa" component={Esa} />
                    <Route exact path="/about" component={About} />
                </main>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            component={Link}
                            to="esa"
                            key="esa"
                            onClick={() => {setSelectedMenuPoint("esa"); handleDrawerClose();}}
                        >
                            <ListItemText primary={menuPoints["esa"]} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="about"
                            key="about"
                            onClick={() => {setSelectedMenuPoint("about"); handleDrawerClose();}}
                        >
                            <ListItemText primary={menuPoints["about"]} />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        </Router>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;
