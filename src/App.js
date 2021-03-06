import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import DashboardLayoutRoute from './layouts/DashboardLayout';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import Dash from './components/Dash'
import DashWithAuthOpen from './components/DashWithAuthOpen'
import RecoveryPassword from './components/pages/RecoveryPassword'
import axios from "axios"
import Profile from "./components/pages/Profile";
import ProfileLayoutRoute from "./layouts/ProfileLayout";
import ProfileFollower from "./components/pages/ProfileFollower";
import PollView from "./components/pages/PollView";
import License from "./components/pages/License";
import ProfileEdit from "./components/pages/ProfileEdit";
import PasswordChange from "./components/pages/PasswordChange";
import RecoveryPasswordConfirm from "./components/pages/RecoveryPasswordConfirm";
import PollCreate from "./components/pages/PollCreate";
import ChatPage from "./components/pages/ChatPage";
import ConfirmUser from "./components/pages/ConfirmUser";
import Registration from "./components/pages/Registration";
import StatisPage from "./components/pages/StatisPage";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import setUserData from './redux/actions/setUserData'
import ProfileUser from "./components/pages/ProfileUser";
import PageNotFound from "./components/pages/PageNotFound";
import UserFollowers from "./components/pages/user/UserFollowers";
import UserFollowing from "./components/pages/user/UserFollowing";


// const styles = theme => ({
//
//     cssOutlinedInput: {
//         '&$cssFocused $notchedOutline': {
//             //borderColor: `#e35b1e !important`,
//             borderWidth: 1,
//             borderStyle: 'solid',
//             borderColor: 'rgba(0, 0, 0, 0.23)'
//         },
//         "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
//             borderColor: 'rgba(0, 0, 0, 0.23)'
//         },
//     },
//
//     cssFocused: {
//         borderColor: `#e35b1e !important`,
//     },
//
//     notchedOutline: {
//         borderWidth: 1,
//         borderStyle: 'solid',
//         borderColor: 'rgba(0, 0, 0, 0.23)',
//         "&:hover": {
//             borderWidth: 1,
//             borderStyle: 'solid',
//             borderColor: 'rgba(0, 0, 0, 0.23)',
//         }
//
//     },
//
//
// });

const outerTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 400,
        color: "#2B2A29"
    },
    overrides: {
        MuiInputBase: {
            root: {
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 15,
                fontWeight: 400
            }
        },
        MuiButton: {
            label: {
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 15,
                textTransform: 'initial',
                fontWeight: 600,
            }

            //outline: none
        },
        MuiContainer:{
            root:{
                paddingLeft:5,
                paddingRight:5,
            }
        },
        MuiPaper: {
            elevation1: {
                border: '1px solid #e6e6e6',
                boxShadow: 'unset'
            }
        },
        MuiButtonBase: {
            root: {
                "&:focus": {
                    outline: 'none'
                }
            }
        },
        MuiIconButton: {
            root: {
                "&:focus": {
                    outline: 'none'
                }
            }
        },
        MuiOutlinedInput: {
            root: {
                "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                    borderColor: 'rgba(0, 0, 0, 0.23)'
                },
                '&$focused $notchedOutline': {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'rgba(0, 0, 0, 0.23)'
                },
            },

            notchedOutline: {
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                '&$focused $notchedOutline': {
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                '&::placeholder': {
                    textOverflow: 'ellipsis !important',
                    color: 'blue'
                }
            }
        },
    },
    palette: {
        primary: {
            main: '#000',
        },
        secondary: {
            main: "#E05022"
        },
        secondary1: {
            main: "#4fe329"
        },
        mainBlackColor: "#2B2A29",
        BorderColor: "#E6E6E6",
        YellowColor: "#E05022",
    },
});


const routesGuest = [
    {url: '/search/:search', component: Dash, layout: 'dashboard'},
    {url: '/polls/:id', component: PollView, layout: 'dashboard'},
    {url: '/polls/:username/:id', component: PollView, layout: 'dashboard'},

    {url: '/account/confirm/:token', component: ConfirmUser, layout: 'dashboard'},
    {url: '/account/recovery', component: RecoveryPassword, layout: 'dashboard'},

    {url: '/license', component: License, layout: 'dashboard'},
    {url: '/profile/:username/followers', component: UserFollowers, layout: 'Profile'},
    {url: '/profile/:username/following', component: UserFollowing, layout: 'Profile'},
    {url: '/profile/:username', component: ProfileUser, layout: 'Profile'},
    {url: '/account/registration', component: Registration, layout: 'dashboard'},
    {url: '/statis/:id', component: StatisPage, layout: 'dashboard'},
    //** UNAUTH USER*//
    {url: '/poll/create', component: DashWithAuthOpen, layout: 'dashboard'},
    {url: '/poll/create/:referal_id', component: DashWithAuthOpen, layout: 'dashboard'},
    {url: '/poll/edit/:id', component: DashWithAuthOpen, layout: 'dashboard'},
    {url: '/account/profile', component: DashWithAuthOpen, layout: 'Profile'},

    {url: '/account/followers', component: DashWithAuthOpen, layout: 'Profile'},
    {url: '/account/following', component: DashWithAuthOpen, layout: 'Profile'},
    {url: '/account/profile-edit', component: DashWithAuthOpen, layout: 'dashboard'},
    {url: '/account/passchange', component: DashWithAuthOpen, layout: 'dashboard'},
    {url: '/chat', component: DashWithAuthOpen, layout: 'dashboard'},
    {url: '/chat/:chat_id', component: DashWithAuthOpen, layout: 'dashboard'},
];
const routes = [
    {url: '/search/:search', component: Dash, layout: 'dashboard'},
    {url: '/license', component: License, layout: 'dashboard'},
    {url: '/polls/:username/:id', component: PollView, layout: 'dashboard'},
    {url: '/poll/create', component: PollCreate, layout: 'dashboard'},
    {url: '/poll/create/:referal_id', component: PollCreate, layout: 'dashboard'},
    {url: '/poll/edit/:id', component: PollCreate, layout: 'dashboard'},

    {url: '/statis/:id', component: StatisPage, layout: 'dashboard'},

    {url: '/polls/:id', component: PollView, layout: 'dashboard'},
    {url: '/account/profile', component: Profile, layout: 'Profile'},

    {url: '/account/followers', component: ProfileFollower, layout: 'Profile'},
    {url: '/account/following', component: ProfileFollower, layout: 'Profile'},

    {url: '/account/profile-edit', component: ProfileEdit, layout: 'dashboard'},
    {url: '/account/passchange', component: PasswordChange, layout: 'dashboard'},
    {url: '/profile/:username/followers', component: UserFollowers, layout: 'Profile'},
    {url: '/profile/:username/following'    , component: UserFollowing, layout: 'Profile'},
    {url: '/profile/:username', component: ProfileUser, layout: 'Profile'},
    {url: '/account/recovery', component: RecoveryPassword, layout: 'dashboard'},
    {url: '/chat', component: ChatPage, layout: 'dashboard'},
    {url: '/chat/:chat_id', component: ChatPage, layout: 'dashboard'},

];

class App extends Component {
    constructor(props) {
        super(props);
        document.title = this.props.title;
    }

    componentDidMount() {

        if (localStorage.getItem('token') !== null) {
            this.fetchMe();
        }
    }

    fetchMe = () => {
        axios.get("profil/me").then(res => {
            this.props.setUserData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    componentWillMount() {

        axios.defaults.baseURL = "https://api.umnenie.com/v1/";
        axios.interceptors.request.use(function (config) {
            if (localStorage.getItem('token') !== null) {
                config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            }
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            // Do something with response data
            return response;
        }, function (error) {
            if (error.response.status === undefined)
                return Promise.reject(error);
            if (error.response.status === 401) {
                 localStorage.removeItem('token')
                window.location.replace('/');
                // window.location.replace('/auth/login');
            }
            return Promise.reject(error);
        });

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.title!== this.props.title){
            document.title = this.props.title + " - Umnenie.com";
        }
    }

    render() {

        return (
            <ThemeProvider theme={outerTheme}>
                <Router>
                    <Switch>
                        <DashboardLayoutRoute exact path="/" component={Dash}/>

                        {this.props.isAuthenticated ? routes.map(routeItem => {
                                if (routeItem.layout === 'Profile') {
                                    return <ProfileLayoutRoute
                                        exact path={routeItem.url}
                                        key={routeItem.url}
                                        component={routeItem.component}
                                    />
                                }
                                return <DashboardLayoutRoute
                                    exact path={routeItem.url}
                                    key={routeItem.url}
                                    component={routeItem.component}
                                />
                            }) :
                            routesGuest.map(routeItem => {
                                if (routeItem.layout === 'Profile') {
                                    return <ProfileLayoutRoute
                                        exact path={routeItem.url}
                                        component={routeItem.component}
                                    />
                                }
                                return <DashboardLayoutRoute
                                    exact path={routeItem.url}
                                    component={routeItem.component}
                                />
                            })
                        }

                        <DashboardLayoutRoute exact path={"*"} exact component={PageNotFound}/>

                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }

}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.mainData.isAuthenticated,
        user: state.mainData.user,
        title: state.mainData.title,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setUserData}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);




