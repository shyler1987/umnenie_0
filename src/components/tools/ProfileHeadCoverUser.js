import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {withRouter} from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux'
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from 'prop-types';
import axios from "axios";
import MySnackbarContentWrapper from "./MySnackbarContentWrapper";
import Snackbar from "@material-ui/core/Snackbar";
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import DialogContent from "@material-ui/core/DialogContent";
import {QRCode} from "react-qrcode-logo";
import logoQr from "../../media/logo_q.png";
import Dialog from "@material-ui/core/Dialog";
import {bindActionCreators} from "redux";
import setTitle from "../../redux/actions/setTitleAction";
import setIsAuth from '../../redux/actions/setIsAuth'


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },

    inputHeight: {
        height: 100
    },
    textP: {
        fontSize: 14,
        textAlign: 'justify',
        paddingTop: 10
    },
    callCenter: {
        textAlign: 'right',
    },
    copyright: {
        textAlign: 'left',
    },
    bigAvatar: {
        margin: 5,
        width: 180,
        height: 180,
        border: '4px solid #fff',
        [theme.breakpoints.down('md')]: {
            margin: 5,
            width: 90,
            height: 90,
            border: '3px solid #fff',
        },
    },
    cover: {
        position: 'absolute',
        bottom: -30,
        zIndex: 1000
    },
    timelineCover: {

        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: 300,
        borderRadius: '0 0 4px 4px',
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            minHeight: 202,
        }

    },

    button: {
        margin: '15px 0px 15px'
    },
    buttonLine: {
        margin: '0px 5px 0px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            margin: '5px 0px',
        }
    },
    buttonOblojka: {},

    buttonFollow: {
        color: "#ffffff",
        fontWeight: 600,
        borderColor: 'rgba(230, 230, 230, 0.45)',
        margin: '0px 5px 0px 5px',
        background: 'rgba(43, 42, 41, 0.45)',
        '&:hover': {
            borderColor: 'rgba(230, 230, 230, 0.45)',
            background: 'rgba(255, 255, 255, 0.2)'
        },
        '&:active': {
            boxShadow: 'none',
            borderColor: 'rgba(230, 230, 230, 0.45)',
            background: 'rgba(43, 42, 41, 0.45)'
        },
        '&:focus': {
            boxShadow: '0 0 0 0.0rem rgba(255,255,255,.5)',
            color: 'outline: 5px auto #fff',
            background: 'rgba(43, 42, 41, 0.45)'
        },
    },
    buttonFollowMobile: {
        color: "#000",
        fontWeight: 600,
        width: '100%',
        borderColor: 'rgba(230, 230, 230, 0.45)',
        margin: '4px 0px',
        //background: 'rgba(43, 42, 41, 0.45)',
        '&:hover': {
            borderColor: 'rgba(230, 230, 230, 0.45)',
            //background: 'rgba(43, 42, 41, 0.45)'
        },
        '&:active': {
            boxShadow: 'none',
            borderColor: 'rgba(230, 230, 230, 0.45)',
            //background: 'rgba(43, 42, 41, 0.45)'
        },
        '&:focus': {
            boxShadow: '0 0 0 0.0rem rgba(255,255,255,.5)',
            color: 'outline: 5px auto #fff',
            //background: 'rgba(43, 42, 41, 0.45)'
        },
    },
    buttonFollowMobileLabel: {
        justifyContent: 'normal',
        display: 'flow-root',
        textAlign: 'left'


    },

    profileTitleBar: {
        bottom: 55,
        left: 210,
        width: '150%',
        position: "absolute",
        [theme.breakpoints.down('md')]: {
            left: 110,
            width: '163%',
            right: 0,
            bottom: 40,
            position: 'absolute',
            display: 'inline-block'
        }
    },
    profileTitle: {
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize: 30,
        fontWeight: 600,
        color: "#fff",
        textShadow: '0 0 20px #000000',
        [theme.breakpoints.down('md')]: {
            fontSize: 22,
            fontWeight: 600,
            lineHeight: 'normal',
            textShadow: '0 0 20px #000000',
        }
    }
    ,
    profileTitleDate: {
        textShadow: '0 0 20px #000000',
        fontWeight: 400,
        color: "#fff",
    },
    profileHeadButtonBar: {
        top: 130,
        position: "relative"
    },
    dot: {
        borderRadius: '50%',
        width: 5,
        height: 5,
        background: "#e67043",
        right: 10,
        top: 18,
        position: 'absolute',


    },
    fotoBouttonContainer: {
        marginTop: 25,
        padding: '15px 0px 15px',
        minHeight: 74
    },

    buttonLeftPhoto: {
        width: 25,
        marginRight: 10
    },

    socialIcons: {
        display: 'inline',
        "& a": {
            margin: '0px 10px 0px',

        },
        [theme.breakpoints.down('md')]: {
            display: 'block',
            margin: '10px 0px 10px',
            "& a": {
                margin: '0px 10px 0px',

            },
        }
    },
    timelineSocial: {
        background: "#fff",
        position: 'relative',
    },
    lineGrid: {
        textAlign: 'right',
        margin: '10px 0px'
    },
    svgRootIcon: {
        width: 20,
        height: 20,
        '&:hover': {
            cursor: 'pointer'
        },
    },
    svgRootIconRight: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    input: {
        display: 'none'
    }


});
const USER_BLOKUSER = "profil/block-user";
const USER_SUBSCRIBE = "profil/subscribe-in-info";
const USER_CHAT = "/profil/chat-create";
const USER_ME = "profil/user-info";

class ProfileHeadCoverUser extends Component {

    constructor(props) {
        super(props);
        const {profilePhoto, userBackground, userId, isBlocked, isFollow, subscribersCount, subscriptionCount} = this.props;

        this.state = {
            openSnakbar: false,
            show: false,
            isFollow: isFollow,
            userId: userId === null ? false : userId,
            isBlocked: isBlocked === null ? false : isBlocked,
            profilePhoto: profilePhoto === null ? false : profilePhoto,
            userBackground: userBackground === null ? "" : userBackground,
            subscribersCount: subscribersCount === null ? 0 : subscribersCount,
            subscriptionCount: subscribersCount === null ? 0 : subscriptionCount,

        }
    }

    showLoadingBar = (bool) => {
        this.setState({
            show: bool
        })
    }

    messageTo = () => {
        this.showLoadingBar(true)
        axios.post(USER_CHAT, {to: this.props.userId}).then(res => {
            this.showLoadingBar(false);
            if (res.status === 202) {
                this.props.history.push('/chat/' + res.data.chat_id);
            }
        }).catch(err => {
            this.showLoadingBar(false);
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.userBackground !== nextProps.userBackground) {
            this.setState({
                userBackground: nextProps.userBackground,
                userType: nextProps.userType,

            })
        }
        if (this.props.userId !== nextProps.userId) {
            this.setState({
                userId: nextProps.userId,

            })
        }

        if (this.props.subscribersCount !== nextProps.subscribersCount) {
            this.setState({
                subscribersCount: nextProps.subscribersCount,
            })
        }

        if (this.props.subscriptionCount !== nextProps.subscriptionCount) {
            this.setState({
                subscriptionCount: nextProps.subscriptionCount,
            })
        }

        if (this.props.isBlocked !== nextProps.isBlocked) {
            this.setState({
                isBlocked: nextProps.isBlocked,

            })
        }
        if (this.props.isFollow !== nextProps.isFollow) {
            this.setState({
                isFollow: nextProps.isFollow,

            })
        }


    }
    getUserMe = () => {
        axios.post(USER_ME, {
            username: this.props.match.params.username
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    subscribersCount: res.data.subscribersCount,
                    subscriptionCount: res.data.subscriptionCount,

                })
                this.props.setTitle(res.data.userFIO)
            }

        }).catch(err => {
            console.log(err)
        })
    }
    setFollow = () => {

        this.showLoadingBar(true);
        axios.post(USER_SUBSCRIBE, {
            user_id: this.state.userId
        }).then(res => {
            if (res.status === 201) {
                this.setState({
                    isFollow: res.data.status
                })
                this.getUserMe();
            }
            this.showLoadingBar(false);
        }).catch(err => {
            this.showLoadingBar(false);
        })
    }


    setBlockUser = () => {
        this.showLoadingBar(true);
        axios.post(USER_BLOKUSER, {
            user_id: this.state.userId
        }).then(res => {
            if (res.status === 201) {
                this.setState({
                    isBlocked: res.data.status
                })
            }
            this.showLoadingBar(false);
        }).catch(err => {
            this.showLoadingBar(false);
        })
    }

    closeSnakbar = () => {
        this.setState({
            openSnakbar: false,
        })
    }

    openSnakbar = (snakbarVariant, snakbarMessage) => {
        this.setState({
            openSnakbar: true,
            snakbarVariant: snakbarVariant,
            snakbarMessage: snakbarMessage,
        })
    }

    dialogOpenClick = () => {
        this.setState({
            dialogopen: true
        })
    }

    handleClose = () => {
        this.setState({
            dialogopen: false
        })
    }

    checkAuth = (url) => (e) => {
        e.preventDefault();
        if (this.props.isAuthenticated === false) {
            this.props.setIsAuth(true);
            return;
        }
        this.props.history.push(url);
    }

    render() {
        const {
            classes,
            social_networks,
            userFIO,
            userImage,
        } = this.props;

        const socialIcons = <React.Fragment>
            <div className={classes.socialIcons}>
                {this.state.userType === 2 &&
                <SvgIcon onClick={this.dialogOpenClick} viewBox="0 0 14 14" classes={{root: classes.svgRootIcon}}>
                    <defs>
                        <clipPath id="clip-path-qrcode">
                            <rect id="Rectangle_72" data-name="Rectangle 72" width="14"
                                  height="14" transform="translate(234 1407)" fill="#fff"
                                  stroke="#707070" stroke-width="1"/>
                        </clipPath>
                    </defs>
                    <g id="Mask_Group_22" data-name="Mask Group 22"
                       transform="translate(-234 -1407)" clip-path="url(#clip-path-qrcode)">
                        <g id="qr-code_4_" data-name="qr-code (4)"
                           transform="translate(234 1407)">
                            <g id="Group_1538" data-name="Group 1538">
                                <g id="Group_1537" data-name="Group 1537">
                                    <path id="Path_1237" data-name="Path 1237"
                                          d="M5.879,0H.41A.41.41,0,0,0,0,.41V5.879a.41.41,0,0,0,.41.41H5.879a.41.41,0,0,0,.41-.41V.41A.41.41,0,0,0,5.879,0Zm-.41,5.469H.82V.82H5.469Z"/>
                                </g>
                            </g>
                            <g id="Group_1540" data-name="Group 1540">
                                <g id="Group_1539" data-name="Group 1539">
                                    <path id="Path_1238" data-name="Path 1238"
                                          d="M3.965,1.914H2.324a.41.41,0,0,0-.41.41V3.965a.41.41,0,0,0,.41.41H3.965a.41.41,0,0,0,.41-.41V2.324A.41.41,0,0,0,3.965,1.914Zm-.41,1.641h-.82v-.82h.82Z"/>
                                </g>
                            </g>
                            <g id="Group_1542" data-name="Group 1542">
                                <g id="Group_1541" data-name="Group 1541">
                                    <path id="Path_1239" data-name="Path 1239"
                                          d="M13.59,0H8.121a.41.41,0,0,0-.41.41V5.879a.41.41,0,0,0,.41.41H13.59a.41.41,0,0,0,.41-.41V.41A.41.41,0,0,0,13.59,0Zm-.41,5.469H8.531V.82H13.18Z"/>
                                </g>
                            </g>
                            <g id="Group_1544" data-name="Group 1544">
                                <g id="Group_1543" data-name="Group 1543">
                                    <path id="Path_1240" data-name="Path 1240"
                                          d="M11.676,1.914H10.035a.41.41,0,0,0-.41.41V3.965a.41.41,0,0,0,.41.41h1.641a.41.41,0,0,0,.41-.41V2.324A.41.41,0,0,0,11.676,1.914Zm-.41,1.641h-.82v-.82h.82Z"/>
                                </g>
                            </g>
                            <g id="Group_1546" data-name="Group 1546">
                                <g id="Group_1545" data-name="Group 1545">
                                    <path id="Path_1241" data-name="Path 1241"
                                          d="M5.879,7.711H.41a.41.41,0,0,0-.41.41V13.59A.41.41,0,0,0,.41,14H5.879a.41.41,0,0,0,.41-.41V8.121A.41.41,0,0,0,5.879,7.711Zm-.41,5.469H.82V8.531H5.469Z"/>
                                </g>
                            </g>
                            <g id="Group_1548" data-name="Group 1548">
                                <g id="Group_1547" data-name="Group 1547">
                                    <path id="Path_1242" data-name="Path 1242"
                                          d="M3.965,9.625H2.324a.41.41,0,0,0-.41.41v1.641a.41.41,0,0,0,.41.41H3.965a.41.41,0,0,0,.41-.41V10.035A.41.41,0,0,0,3.965,9.625Zm-.41,1.641h-.82v-.82h.82Z"/>
                                </g>
                            </g>
                            <g id="Group_1550" data-name="Group 1550">
                                <g id="Group_1549" data-name="Group 1549">
                                    <path id="Path_1243" data-name="Path 1243"
                                          d="M13.59,11.556H11.266V10.035a.41.41,0,0,0-.82,0v1.931a.41.41,0,0,0,.41.41H13.18v.8H10.855a.41.41,0,0,0,0,.82H13.59a.41.41,0,0,0,.41-.41V11.967A.41.41,0,0,0,13.59,11.556Z"/>
                                </g>
                            </g>
                            <g id="Group_1552" data-name="Group 1552">
                                <g id="Group_1551" data-name="Group 1551">
                                    <path id="Path_1244" data-name="Path 1244"
                                          d="M13.59,7.711a.41.41,0,0,0-.41.41v1.914a.41.41,0,0,0,.82,0V8.121A.41.41,0,0,0,13.59,7.711Z"/>
                                </g>
                            </g>
                            <g id="Group_1554" data-name="Group 1554">
                                <g id="Group_1553" data-name="Group 1553">
                                    <path id="Path_1245" data-name="Path 1245"
                                          d="M10.035,7.711H8.121a.41.41,0,0,0-.41.41v1.914a.41.41,0,0,0,.82,0v-1.5h1.5a.41.41,0,0,0,0-.82Z"/>
                                </g>
                            </g>
                            <g id="Group_1556" data-name="Group 1556">
                                <g id="Group_1555" data-name="Group 1555">
                                    <path id="Path_1246" data-name="Path 1246"
                                          d="M8.121,11.556a.41.41,0,0,0-.41.41V13.59a.41.41,0,0,0,.82,0V11.967A.41.41,0,0,0,8.121,11.556Z"/>
                                </g>
                            </g>
                        </g>
                    </g>
                </SvgIcon>
                }
                <a href={social_networks.site}  rel="nofollow" target={"_blank"}>
                    <SvgIcon viewBox="0 0 15 15" classes={{root: classes.svgRootIcon}}>
                        <defs>
                            <clipPath id="clip-path-web">
                                <rect id="Rectangle_66" data-name="Rectangle 66" width="15" height="15"
                                      transform="translate(3 26)" fill="#2b2a29" stroke="#707070" stroke-width="1"/>
                            </clipPath>
                        </defs>
                        <g id="Mask_Group_17" data-name="Mask Group 17" transform="translate(-3 -26)"
                           clip-path="url(#clip-path-web)">
                            <g id="worldwide" transform="translate(3 26)">
                                <g id="Group_1502" data-name="Group 1502">
                                    <path id="Path_88" data-name="Path 88"
                                          d="M7.5,0A7.5,7.5,0,1,0,15,7.5,7.509,7.509,0,0,0,7.5,0ZM5.062,1.452A7.6,7.6,0,0,0,4.033,3.513a6.976,6.976,0,0,1-1.2-.559A6.545,6.545,0,0,1,5.062,1.452ZM2.194,3.712a7.906,7.906,0,0,0,1.572.742,13.1,13.1,0,0,0-.333,2.557H1A6.484,6.484,0,0,1,2.194,3.712Zm0,7.576A6.483,6.483,0,0,1,1,7.989H3.432a13.1,13.1,0,0,0,.333,2.557A7.909,7.909,0,0,0,2.194,11.288Zm.635.758a6.976,6.976,0,0,1,1.2-.559,7.6,7.6,0,0,0,1.028,2.061A6.544,6.544,0,0,1,2.829,12.046Zm4.182,1.885c-1.01-.371-1.691-1.7-2.04-2.722a10.77,10.77,0,0,1,2.04-.275Zm0-3.976A11.736,11.736,0,0,0,4.7,10.27a12.125,12.125,0,0,1-.294-2.28h2.6V9.955Zm0-2.945h-2.6A12.121,12.121,0,0,1,4.7,4.73a11.736,11.736,0,0,0,2.306.314Zm0-2.945a10.77,10.77,0,0,1-2.04-.275C5.32,2.768,6,1.439,7.011,1.069Zm5.8-.354a6.483,6.483,0,0,1,1.2,3.3H11.568a13.1,13.1,0,0,0-.333-2.557A7.908,7.908,0,0,0,12.806,3.712Zm-.635-.758a6.976,6.976,0,0,1-1.2.559A7.6,7.6,0,0,0,9.938,1.452,6.544,6.544,0,0,1,12.171,2.954ZM7.989,1.069c1.01.371,1.691,1.7,2.04,2.722a10.77,10.77,0,0,1-2.04.275v-3Zm0,3.976A11.736,11.736,0,0,0,10.3,4.73a12.125,12.125,0,0,1,.294,2.28h-2.6Zm0,2.941h2.6A12.155,12.155,0,0,1,10.3,10.27a11.736,11.736,0,0,0-2.306-.314Zm0,5.946v-3a10.77,10.77,0,0,1,2.04.275C9.68,12.232,9,13.561,7.989,13.931Zm1.949-.383a7.6,7.6,0,0,0,1.028-2.061,6.977,6.977,0,0,1,1.2.559A6.545,6.545,0,0,1,9.938,13.548Zm2.867-2.26a7.906,7.906,0,0,0-1.572-.742,13.129,13.129,0,0,0,.333-2.56H14A6.494,6.494,0,0,1,12.806,11.288Z"
                                          fill="#2b2a29"/>
                                </g>
                            </g>
                        </g>
                    </SvgIcon>
                </a>
                <a href={social_networks.telegram}  rel="nofollow" target={"_blank"}>
                    <SvgIcon viewBox="0 0 15 15" classes={{root: classes.svgRootIcon}}>
                        <defs>
                            <clipPath id="clip-path-telegram">
                                <rect id="Rectangle_67" data-name="Rectangle 67" width="15" height="15"
                                      transform="translate(3 49)" fill="#2b2a29" stroke="#707070" stroke-width="1"/>
                            </clipPath>
                        </defs>
                        <g id="Mask_Group_16" data-name="Mask Group 16" transform="translate(-3 -49)"
                           clip-path="url(#clip-path-telegram)">
                            <g id="telegram-logo" transform="translate(3 49)">
                                <path id="Path_87" data-name="Path 87"
                                      d="M12.075,14.209a.594.594,0,0,1-.333-.1L7.97,11.548,5.948,13a.594.594,0,0,1-.921-.33L4.011,8.824.382,7.436A.594.594,0,0,1,.374,6.33L14.174.839a.594.594,0,0,1,.2-.046.619.619,0,0,1,.072,0,.592.592,0,0,1,.38.169l.031.033A.591.591,0,0,1,15,1.342a.6.6,0,0,1,0,.095.577.577,0,0,1-.01.068L12.659,13.726a.594.594,0,0,1-.583.483ZM8.3,10.338l3.36,2.279,1.812-9.51-6.546,6.3,1.358.921ZM5.5,9.831l.45,1.7.969-.7L5.655,9.977A.592.592,0,0,1,5.5,9.831ZM2.227,6.87l2.492.953a.594.594,0,0,1,.362.4l.316,1.2a.594.594,0,0,1,.179-.366l6.238-6Z"
                                      fill="#2b2a29"/>
                            </g>
                        </g>
                    </SvgIcon>
                </a>
                <a href={social_networks.facebook}  rel="nofollow" target={"_blank"}>
                    <SvgIcon viewBox="0 0 15 15" classes={{root: classes.svgRootIcon}}>
                        <defs>
                            <clipPath id="clip-path-facebook">
                                <rect id="Rectangle_68" data-name="Rectangle 68" width="15" height="15"
                                      transform="translate(189 26)" fill="#2b2a29" stroke="#707070" stroke-width="1"/>
                            </clipPath>
                        </defs>
                        <g id="Mask_Group_14" data-name="Mask Group 14" transform="translate(-189 -26)"
                           clip-path="url(#clip-path-facebook)">
                            <g id="facebook_1_" data-name="facebook (1)" transform="translate(189 26)">
                                <path id="Path_83" data-name="Path 83"
                                      d="M8.681,15H5.87V7.5H3.995V4.915H5.87l0-1.523C5.867,1.283,6.439,0,8.923,0h2.068V2.585H9.7c-.967,0-1.014.361-1.014,1.035l0,1.294h2.325L10.731,7.5H8.682Z"
                                      fill="#2b2a29"/>
                            </g>
                        </g>
                    </SvgIcon>
                </a>
                <a href={social_networks.twitter}  rel="nofollow" target={"_blank"}>
                    <SvgIcon viewBox="0 0 15 15" classes={{root: classes.svgRootIcon}}>
                        <defs>
                            <clipPath id="clip-path-instagram">
                                <rect id="Rectangle_69" data-name="Rectangle 69" width="15" height="15"
                                      transform="translate(189 49)" fill="#2b2a29" stroke="#707070" stroke-width="1"/>
                            </clipPath>
                        </defs>
                        <g id="Mask_Group_15" data-name="Mask Group 15" transform="translate(-189 -49)"
                           clip-path="url(#clip-path-instagram)">
                            <g id="instagram-logo" transform="translate(189 49)">
                                <path id="Path_84" data-name="Path 84"
                                      d="M10.86,0H4.139A4.144,4.144,0,0,0,0,4.139v6.721A4.144,4.144,0,0,0,4.139,15H10.86A4.144,4.144,0,0,0,15,10.861V4.139A4.144,4.144,0,0,0,10.86,0Zm2.809,10.861a2.812,2.812,0,0,1-2.809,2.809H4.139a2.812,2.812,0,0,1-2.808-2.809V4.139A2.812,2.812,0,0,1,4.139,1.331H10.86a2.812,2.812,0,0,1,2.809,2.809v6.721Z"
                                      fill="#2b2a29"/>
                                <path id="Path_85" data-name="Path 85"
                                      d="M7.5,3.635A3.865,3.865,0,1,0,11.365,7.5,3.869,3.869,0,0,0,7.5,3.635Zm0,6.4A2.534,2.534,0,1,1,10.034,7.5,2.537,2.537,0,0,1,7.5,10.034Z"
                                      fill="#2b2a29"/>
                                <path id="Path_86" data-name="Path 86"
                                      d="M11.527,2.507a.975.975,0,1,0,.69.286A.98.98,0,0,0,11.527,2.507Z"
                                      fill="#2b2a29"/>
                            </g>
                        </g>
                    </SvgIcon>
                </a>
            </div>
        </React.Fragment>;
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="simple-dialog-title"

                    maxWidth={"xs"}
                    open={this.state.dialogopen}>
                    <DialogContent>
                        <QRCode
                            logoImage={logoQr}
                            size={250}
                            logoWidth={80}
                            value={"https://umnenie.com/poll/create/" + this.state.userId}/>
                    </DialogContent>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.openSnakbar}
                    autoHideDuration={6000}
                    onClose={this.closeSnakbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnakbar}
                        variant={this.state.snakbarVariant}
                        message={this.state.snakbarMessage}
                    />
                </Snackbar>
                <div className={classes.timelineCover} style={{background: 'url(' + this.state.userBackground + ')'}}>
                    <Container>
                        <Grid
                            direction={"row"}
                            container
                            alignItems="flex-end"
                        >
                            <Grid item md={6}>
                                <div className={classes.cover}>
                                    <Avatar alt="Remy Sharp" src={userImage} className={classes.bigAvatar}/>
                                    <div className={classes.profileTitleBar}>
                                        <Typography variant="caption" display="block"
                                                    classes={{root: classes.profileTitleDate}}>
                                            {/*{userRegistryDate}*/}
                                        </Typography>
                                        <Typography classes={{root: classes.profileTitle}}>{userFIO}</Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Hidden mdDown>
                                <Grid item md={6} style={{textAlign: "right"}} xsDown>

                                    <div className={classes.fotoBouttonContainer}>


                                    </div>


                                    <div className={classes.profileHeadButtonBar}>

                                        <Button variant="outlined" className={classes.button}
                                                classes={{root: classes.buttonFollow}} size="large"

                                                onClick={this.checkAuth("/profile/" + this.props.match.params.username + "/followers")}
                                        >

                                            Подписчиков <span
                                            style={{marginLeft: 20, color: '#e35b1e'}}>{this.state.subscribersCount}</span>
                                            <dot className={classes.dot}></dot>
                                        </Button>
                                        <Button variant="outlined" className={classes.button}

                                                onClick={this.checkAuth("/profile/" + this.props.match.params.username + "/following")}
                                                classes={{root: classes.buttonFollow}} size="large">
                                            Подписки <span
                                            style={{marginLeft: 20, color: '#e35b1e'}}>{this.state.subscriptionCount}</span>
                                            <dot className={classes.dot}></dot>
                                        </Button>
                                    </div>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Container>
                </div>

                <div className={classes.timelineSocial}>

                    <Container>

                        <Grid
                            direction={"row"}
                            container
                        >
                            <Hidden only={['md', 'xl', 'lg']}>
                                <Grid item md={12} sm={12} xs={12} style={{textAlign: 'center'}}>

                                    {socialIcons}

                                </Grid>
                            </Hidden>
                            <Grid item md={12} sm={12} xs={12} classes={{root: classes.lineGrid}}>
                                <Hidden mdDown>
                                    {socialIcons}
                                </Hidden>

                                <Hidden only={['md', 'xl', 'lg']}>
                                    <Button
                                        variant="outlined"
                                        className={classes.button}
                                        classes={{
                                            root: classes.buttonFollowMobile,
                                            label: classes.buttonFollowMobileLabel
                                        }}
                                        color="secondary1"
                                        size="large"
                                        onClick={this.checkAuth("/profile/" + this.props.match.params.username + "/followers")}


                                    >
                                        Подписчики <span style={{
                                        marginLeft: 20,
                                        color: '#e35b1e',
                                        float: "right"
                                    }}>{this.state.subscribersCount}</span>
                                        <dot className={classes.dot}></dot>
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        className={classes.button}
                                        classes={{
                                            root: classes.buttonFollowMobile,
                                            label: classes.buttonFollowMobileLabel
                                        }}
                                        color="secondary1"
                                        size="large"
                                        onClick={this.checkAuth("/profile/" + this.props.match.params.username + "/following")}

                                    >
                                        Подписки <span style={{
                                        marginLeft: 20,
                                        color: '#e35b1e',
                                        float: "right"
                                    }}>{this.state.subscriptionCount}</span>
                                        <dot className={classes.dot}></dot>
                                    </Button>

                                </Hidden>

                                {this.props.isAuthenticated ? <React.Fragment>
                                    <Button
                                        variant={"contained"}
                                        size="medium"
                                        color="secondary"
                                        classes={{root: classes.buttonLine}}
                                        onClick={this.setBlockUser}
                                    >
                                        {this.state.isBlocked ? "Заблокирован" : "Заблокировать"}

                                    </Button>

                                    <Button onClick={this.messageTo} variant="contained" size="medium" color="secondary"
                                            classes={{root: classes.buttonLine}}>
                                        Написать
                                    </Button>
                                    <Button
                                        onClick={this.setFollow}
                                        variant="contained" size="medium" color="secondary"
                                        classes={{root: classes.buttonLine}}>
                                        {this.state.isFollow ? "Отменить подписку" : "Подписаться"}
                                    </Button>
                                </React.Fragment> : ""}


                            </Grid>

                        </Grid>
                    </Container>
                </div>
            </div>
        );
    }

}

ProfileHeadCoverUser.propTypes = {
    classes: PropTypes.object.isRequired,
    subscribersCount: PropTypes.number,
    subscriptionCount: PropTypes.number,
    userType: PropTypes.number,
    userId: PropTypes.number,
    social_networks: PropTypes.object,
    userBackground: PropTypes.string,
    userFIO: PropTypes.string,
    userImage: PropTypes.string,
    userRegistryDate: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.mainData.isAuthenticated,
        user: state.mainData.user,
    }
}

function mapDispatch(dispatch) {
    return bindActionCreators({setTitle, setIsAuth}, dispatch);
}


export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(withRouter(ProfileHeadCoverUser)));