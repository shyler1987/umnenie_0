import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        //minHeight:500
    },
    textField: {

    },
    inputHeight:{
        height:100
    },
    textP:{
        fontSize: 13,
        textAlign: 'center',
        padding: '10px 10px 10px',
        fontWeight: 600,
        color:"#2b2a29"
    },

    callCenter:{
        textAlign: 'right',
    },
    copyright:{
        textAlign: 'left',
    },
    ButtonGroup:{
        background: '#fff',
    },
    buttonGroupActive:{
        background: '#e35b1e',
        color: '#fff',
        border: '1px solid #e35b1e',
        '&:hover':{
            background:'rgba(227, 91, 30, 0.08)',
            color: '#e35b1e',
        }
    },
    titleHead:{
        fontWeight: 600,
        fontSize:30,
        margin: '25px 5px 10px 0px'
    },
    outlinedPrimary:{
        border: "1px solid #e6e6e6",
        "&:hover":{
            border: "1px solid #e6e6e6",
        }

    },
    muiBtnLabel:{
        opacity: 0.88
    },
    textA:{
        color:"#e05022",
        textDecoration:'underline'
    },
    marginBottom:{
        marginBottom:30
    }





});

const API_PROFILE = "profil/restore-password";


class RecoveryPasswordConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show:false,
            password: '',
            retry_password: '',
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = () =>{
        axios.post(API_PROFILE, {email:this.state.mail}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                />
                <Typography classes={{root:classes.titleHead}} >
                    Восстановит пароль
                </Typography>
                <Grid container spacing={0} classes={{root:classes.marginBottom}} >
                    <Grid md={12}>
                        <Paper className={classes.paper}>

                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                style={{minHeight:500}}
                            >
                                <Grid item md={4} style={{padding: '0px 20px 0px'}}>
                                    <ValidatorForm onSubmit={this.onSubmit} fullWidth>
                                        <TextValidator
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Пароль"}
                                            className={classes.textField}
                                            margin="normal"
                                            name={"password"}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            type={"password"}
                                            validators={['required']}
                                            errorMessages={['Это поле обязательно к заполнению']}
                                            inputProps={{
                                                style: {
                                                    height:40,
                                                    padding: '0 14px',
                                                },
                                            }}
                                        />

                                        <TextValidator
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Подтвердите новый пароль"}
                                            className={classes.textField}
                                            margin="normal"
                                            name={"retry_password"}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            validators={['required']}
                                            type={"password"}
                                            errorMessages={['Это поле обязательно к заполнению']}
                                            inputProps={{
                                                style: {
                                                    height:40,
                                                    padding: '0 14px',
                                                },
                                            }}
                                        />
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="flex-start"
                                            spacing={2}

                                        >
                                            <Grid item md={4}>
                                                <Button  color="primary" variant={"outlined"} fullWidth classes={{outlinedPrimary:classes.outlinedPrimary}}>
                                                    Назад
                                                </Button>
                                            </Grid>
                                            <Grid item md={8}>
                                                <Button variant="contained" color="secondary" fullWidth classes={{label:classes.muiBtnLabel}} type={"submit"}>
                                                    Отправить смс
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </ValidatorForm>
                                    <div>
                                        <Typography classes={{root:classes.textP}}>Все права защищены. Используя сайт, вы обязуетесь выполнять условия <Link to={"/license"} className={classes.textA}>Пользовательского
                                            соглашения.</Link></Typography>
                                    </div>
                                </Grid>


                            </Grid>


                            <Grid
                                container
                                direction="row"
                                justify="space-evenly"
                                alignItems="flex-end"
                            >
                                <Grid md={12}>
                                    <Divider variant="fullWidth" component="hr"  style={{marginBottom:10}}/>
                                </Grid>
                                <Grid md={6} className={classes.copyright} >
                                    <Typography variant="caption" align={'left'} gutterBottom >
                                        OOO "Umnenie" (с) {new Date().getFullYear()}
                                    </Typography>
                                </Grid>
                                <Grid md={6} className={classes.callCenter}>
                                    <Typography variant="caption"  gutterBottom style={{paddingTop:5}}>
                                        <Link to={"/"}>Обратиться в службу поддержки</Link>
                                    </Typography>

                                </Grid>


                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>


            </div>
        );
    }

}

export default withStyles(styles)(RecoveryPasswordConfirm);