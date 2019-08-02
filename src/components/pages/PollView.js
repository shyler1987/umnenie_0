import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import PollCard from '../tools/PollCard'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../media/style.css';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

import FloatActionButtun from "../tools/FloatActionButtun";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    rootContainer: {
        backgroundColor: '#FAFAFA'
    },
    gridList: {
        // width: 500,
        // height: 450,
    },
    arrowButton: {
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'fixed',
        // paddingRight: 15,
        // paddingLeft: 15
    },
    multlineInput: {
        padding: 10
    },
    noPad:{
        padding:0
    },


});

const dataInit = {
    userId: 1,
    userName: "Иванов Иван Иванович",
    userImage: "http://umnenie.foundrising.uz/uploads/user/foto/1.jpg",
    pollId: 4,
    pollUrl: "http://umnenie.foundrising.uz/api/polls/poll?pollId=4",
    pollType: 1,
    pollTypeText: "Вид с выбором фоновой картинки",
    pollCategory: "kategoriya2",
    pollVisibility: "Виден только по ссылке",
    pollTerm: "Неделя",
    pollViewComment: "Разрешены",
    pollHashtags: "fone image",
    pollPublications: "",
    pollEndDate: "15.11.2019",
    pollQuestion: "Sizn qaysi rasmni fon qilib ishlatar edingiz",
    pollImage: null,
    items: [{
        id: 13,
        option: "Birinchi",
        percent: 0,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/1.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 14,
        option: "Ikkinchi",
        percent: 0,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/3556468-Beautiful-big-white-clouds-in-front-of-blue-sky-background-Stock-Photo.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 15,
        option: "Uchinchi",
        percent: 0,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/background2056509340 — копия.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 16,
        option: "To'rtinchi",
        percent: 50,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/Teaching-Awards-Background.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 17,
        option: "Beshinchi",
        percent: 50,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/Sun-Rays-Blue-Sky-Clouds-Beauty.jpg",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }, {
        id: 18,
        option: "Oltinchi",
        percent: 0,
        image: "http://umnenie.foundrising.uz/uploads/pollitem/software_update.png",
        avatars: ["http://umnenie.foundrising.uz/uploads/user/foto/1.jpg", "http://umnenie.foundrising.uz/uploads/user/foto/2.jpg"]
    }]
};

const API_POLLS = "polls/poll/";


class PollView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            show: false,
            idPoll: this.props.match.params.id
        };
    }


    componentDidMount() {
        this.setState({
            show: true
        })
        axios.get(API_POLLS + this.state.idPoll).then(res => {
            if (res.status === 200 && res.data.count > 0) {

                this.setState({
                    polls: res.data.result

                })
            }
            this.setState({
                show: false
            })

        }).catch(err => {
            this.setState({
                show: false
            })
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <FloatActionButtun/>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <div style={{marginTop: 20}}>

                </div>
                <Grid
                    direction={"row"}
                    container
                    justify={"center"}
                    alignItems={"stretch"}
                    spacing={2}
                >
                    <Grid item md={1}>
                        <Link to={""}>
                            <Paper classes={{root: classes.arrowButton}}>


                                    <KeyboardArrowLeft/>



                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item md={8}>
                        <PollCard

                            idPoll={dataInit.pollId}
                            imagePoll={dataInit.pollImage}
                            fullName={dataInit.userName}
                            contentPoll={dataInit.pollQuestion}
                            datePoll={dataInit.pollEndDate}
                            avatarUrl={dataInit.userImage}
                            pollType={dataInit.pollType}
                            pollItems={dataInit.items}
                            iconFovrite={true}
                            iconComment={true}
                            iconShare={true}
                            iconAnonced={true}
                            iconStatis={true}
                            iconEdit={true}
                        />

                    </Grid>
                    <Grid item md={1}>
                        <Link to={""}>
                            <Paper classes={{root: classes.arrowButton}}>
                                    <KeyboardArrowRight/>
                            </Paper>
                        </Link>
                    </Grid>
                </Grid>
                <Grid
                    direction={"row"}
                    container
                    justify={"center"}
                    alignItems={"stretch"}
                    spacing={5}
                >

                    <Grid item md={8}>
                        <Typography variant="h5" fontWeight="fontWeightBold" component="h5" style={{
                            fontWeight: 700,
                            margin: '25px 5px 10px 0px'
                        }}>
                            Комментарии (658)
                        </Typography>
                        <Paper classes={{root:classes.noPad}}>
                            <div className="d-flex justify-content-start itemChat">
                                <div className="img_cont_msg">
                                    <img
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                        className="rounded-circle user_img_msg"/>
                                </div>
                                <div className="msg_cotainer">
                                    Здраствуйте! Я могу вам чем-то помочь? Если не нужна, то закройте окно чата Всегда
                                    буду рад ответить Вам.
                                    <div className="msg_time">8:40</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start itemChat">
                                <div className="img_cont_msg">
                                    <img
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                        className="rounded-circle user_img_msg"/>
                                </div>
                                <div className="msg_cotainer">
                                    Здраствуйте! Я могу вам чем-то помочь? Если не нужна, то закройте окно чата Всегда
                                    буду рад ответить Вам.
                                    <div className="msg_time">8:40</div>
                                </div>
                            </div>


                            <div className="d-flex justify-content-end itemChat">
                                <div className="msg_cotainer_send">
                                    Hi Maryam i am good tnx how about you?
                                    <div className="msg_time_send">8:55</div>
                                </div>
                                <div className="img_cont_msg">
                                    <img
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                        className="rounded-circle user_img_msg"/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start itemChat">
                                <div className="img_cont_msg">
                                    <img
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                        className="rounded-circle user_img_msg"/>
                                </div>
                                <div className="msg_cotainer">
                                    Здраствуйте! Я могу вам чем-то помочь? Если не нужна, то закройте окно чата Всегда
                                    буду рад ответить Вам.
                                    <div className="msg_time">8:40</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end itemChat">
                                <div className="msg_cotainer_send">
                                    Hi Maryam i am good tnx how about you?
                                    <div className="msg_time_send">8:55</div>
                                </div>
                                <div className="img_cont_msg">
                                    <img
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                        className="rounded-circle user_img_msg"/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end itemChat">
                                <div className="msg_cotainer_send">
                                    Hi Maryam i am good tnx how about you?
                                    <div className="msg_time_send">8:55</div>
                                </div>
                                <div className="img_cont_msg">
                                    <img
                                        src="http://umnenie.foundrising.uz/uploads/user/foto/1.jpg"
                                        className="rounded-circle user_img_msg"/>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <Grid
                                direction={"row"}
                                container
                                spacing={2}
                                style={{padding: 10}}
                            >
                                <Grid item md={9}>
                                    <TextField
                                        id="standard-multiline-flexible"
                                        fullWidth
                                        multiline
                                        variant="outlined"
                                        className={classes.textField}
                                        InputProps={
                                                {
                                                    classes : {
                                                        root:classes.multlineInput
                                                    }
                                                }
                                        }
                                    />
                                </Grid>
                                <Grid item md={3}>
                                    <Button variant="contained" color="secondary" fullWidth
                                            className={classes.button}>
                                        Отправить
                                    </Button>
                                </Grid>


                            </Grid>


                        </Paper>


                    </Grid>

                </Grid>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }

}

export default withStyles(styles)(PollView);