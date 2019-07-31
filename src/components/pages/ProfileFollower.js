import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container'
import CoverImage from '../../media/back.jpg';
import selenaAvatar from '../../media/selenaAvatar.jpg';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';

import ProfileHeadCover from '../tools/ProfileHeadCover'
import ProfileHeadLine from '../tools/ProfileHeadLine'
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    paper: {
        //padding: theme.spacing(2),
        margin: '15px 0px 10px',
        color: theme.palette.text.secondary,
        //minHeight:500
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

    timelineCover: {
        background: `url(${CoverImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: 300,
        borderRadius: '0 0 4px 4px',
        position: 'relative',
    },
    timelineSocial: {
        background: "#fff",
        position: 'relative',
    },
    button: {
        margin: '15px 0px 15px'
    },
    ListButton: {
        textTransform: 'none'
    },
    ListButtonInActive: {
        textTransform: 'none',
        color:"#000",
        borderColor:"#eee"
    },



});

const API_POLLS = "polls/list";


class ProfileFollower extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <ProfileHeadCover profilePhoto={false}/>
                <ProfileHeadLine/>

                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Container>
                    <Typography variant="h4" fontWeight="fontWeightBold" component="h4" style={{

                        margin: '25px 5px 10px 0px'
                    }}>
                        Подписки
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid md={12}>

                            <List>
                                <Paper className={classes.paper}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={selenaAvatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Исидатэ Тайти"
                                            secondary={'Бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла '}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button variant="contained" color="secondary"
                                                    className={classes.ListButton}>Подписаться</Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={selenaAvatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Исидатэ Тайти"
                                            secondary={'Бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла '}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button color="secondary" variant={"outlined"}
                                                    className={classes.ListButtonInActive}>
                                                Подписки
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={selenaAvatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Исидатэ Тайти"
                                            secondary={'Бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла '}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button color="secondary" variant={"outlined"}
                                                    className={classes.ListButtonInActive}>
                                                Подписки
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Paper>
                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}
export default withStyles(styles)(ProfileFollower);