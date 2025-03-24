import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { api_url } from '../config';
import NavBar from './NavBar';
import {
    Switch,
    Route,
    Link,
} from "react-router-dom";
import "./Main.css"
import Home from '../Home/home.js'
import SearchIcon from '@material-ui/icons/Search';
import Login from '../Login and Signup/Login';
import Signup from '../Login and Signup/Signup';
import InterviewInfo from '../InterviewInfo/InterviewInfo'
import ForgotPassword from '../Password/forgotPassword';
import ResetPassword from '../Password/resetPassword';
import ChangePassword from '../Password/changePassword';
import CreatePost from '../Post/createPost';
import Profile from '../profile/profile';
import axios from 'axios';
import { withRouter } from 'react-router';
import Select from 'react-select';
import SearchResults from './searchResults';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: 'rgb(0,27,36)',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up("sm")]: {
            // marginLeft: -drawerWidth,
            width: '100%',
        }
    },
    menuButton: {
        marginRight: 36,
        [theme.breakpoints.up("sm")]: { // change when required
            display: 'none',
        },
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        [theme.breakpoints.up("sm")]: { // change when required
            display: 'none',
            marginRight: '0',
        },
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        minHeight: '100vh',
        background: 'rgb(0,27,36)',
        // background:'linear-gradient(104deg, rgb(0 27 36 / 77%) 0%, rgb(10 62 66 / 16%) 45%);'
        background: "linear-gradient(104deg, rgba(0,27,36,1) 0%, rgba(10,62,66,0.6141807064622724) 45%)",
    },

}));


function Main(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState('')
    const [companyNames, setCompanyNames] = React.useState([])
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleSearch = () => {
        axios.get(`${api_url}/post/get_posts_by_company_name?company_name=${input}`)
            .then(res => {
                props.history.push({
                    pathname: '/SearchResults',
                    fromSearch: true,
                    state: res.data,
                    input: input
                });
                setInput('')
            }).catch(() => {
                console.log('failed to get data on search')
            })

    }

    useEffect(() => {
        axios.get(`${api_url}/post/get_all_company_names`)
            .then(res => {
                setCompanyNames(Array.from(new Set(res.data)))
            }).catch(() => {
                console.log('failed to get company names')
            })
    }, [])
    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className='Header'>
                            <h4>Jobify</h4>
                            <div className='searchBar'>
                                <input list="companyNames" placeholder='Search by Company name' onChange={handleChange} value={input} name="search" id="search" />
                                <datalist id="companyNames">
                                    {
                                        companyNames.map(i => {
                                          return  <option value={i} />
                                        })
                                    }
                                </datalist>
                                {/* <input onChange={handleChange} placeholder='Search by Company Name' /> */}
                                <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} className='searchicon' />
                            </div>
                            <NavBar />
                        </div>
                    </Toolbar>
                </AppBar>
                {/* <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer> */}
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Route exact path='/Login' component={Login}></Route>
                        <Route exact path='/Signup' component={Signup}></Route>
                        <Route exact path={'/InterviewInfo/:post_id'} component={InterviewInfo}></Route>
                        <Route exact path={'/ForgotPassword'} component={ForgotPassword}></Route>
                        <Route exact path={'/ResetPassword'} component={ResetPassword}></Route>
                        <Route exact path={'/ChangePassword'} component={ChangePassword}></Route>
                        <Route exact path={'/CreatePost'} component={CreatePost}></Route>
                        <Route exact path={'/Profile'} component={Profile}></Route>
                        <Route exact path={'/SearchResults'} component={SearchResults}></Route>
                    </Switch>
                </main>

            </div>
            {/* <footer style={{position: "fixed",textAlign: 'center',width: '100%',bottom: '0',borderTop: '1px solid black'}}>
                &copy;hytjusymiy
            </footer> */}
        </>
    );
}

export default withRouter(Main)
