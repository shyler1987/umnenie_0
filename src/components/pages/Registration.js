import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import setIsAuth from '../../redux/actions/setIsAuth'
import seTisAuthenticated from '../../redux/actions/seTisAuthenticated'
import setUserData from '../../redux/actions/setUserData'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import MuiPhoneNumber from "material-ui-phone-number";
// import ReactPhoneInput from 'react-phone-input-mui';
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'

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
        "&:hover": {
            // paddingTop: 25,
            outline: '4px',
            // paddingBottom: 25,
        },

    },
    PhoneInputContainer: {
        "&:focus": {
            boxShadow: 'none'
        },
        marginTop: "5px !important",
        width: "100% !important"
    },

    textFieldRoot: {
        paddingTop: 25,
        "&:focus": {
            // paddingTop: 25,
            outline: '4px',
            // paddingBottom: 25,
        },

    },
    textFieldInput: {},
    inputHeight: {
        height: 100
    },
    textP: {
        fontSize: 13,
        textAlign: 'center',
        padding: '10px 20px 10px',
        fontWeight: 600,
        color: "#2b2a29"
    },
    callCenter: {
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        }
    },
    copyright: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        }
    },
    ButtonGroup: {
        background: '#fff',
        marginBottom: 10
    },
    buttonGroup: {
        color: "#2B2A29"
    },
    buttonGroupActive: {
        background: '#e35b1e',
        color: '#fff',
        border: '1px solid #e35b1e',
        '&:hover': {
            background: '#e35b1e',
            //color:// '#e35b1e',
        }
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            //borderColor: `#e35b1e !important`,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(0, 0, 0, 0.23)'
        },
        "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
            borderColor: 'rgba(0, 0, 0, 0.23)'
        },
    },

    cssFocused: {
        borderColor: `#e35b1e !important`,
    },

    notchedOutline: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        "&:hover": {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(0, 0, 0, 0.23)',
        }

    },
    titleHead: {
        fontWeight: 600,
        fontSize: 30,
        margin: '25px 5px 10px 0px'
    },

    muiBtnLabel: {
        opacity: 0.88
    },
    textA: {
        color: "#e05022",
        textDecoration: 'underline'
    },
    regBtn: {
        marginTop: 10
    },
    marginBottom: {
        marginBottom: 30
    },
    CopyRight: {
        fontSize: 13,
        fontWeight: 400,
        opacity: 0.45,
        color: '#2b2a29'
    },
    support: {
        fontSize: 13,
        fontWeight: 400,
        opacity: 0.45,
        color: '#2b2a29',
        textDecoration: 'underline',
        "&:hover": {
            color: '#2b2a29',
        }
    }

});

const API_REGFISTRATION = "account/registry";
const API_REGFISTRATION_SMS = "account/save-registry";

const NamesState = [
    'phone',
    'fio',
    'org_name',
    'email',
    'username',
    'password',
    'retry_password',
];

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            personToggle: true,
            errorPhone: false,
            errorSms_code: false,
            step: 1,
            dialCode: 0,
        }
    }

    personToggle = () => {
        this.setState({
            personToggle: !this.state.personToggle
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    tellChange = (e, data, event) => {
        // console.log(data, event);
        let without_dialcode = e.replace(/[^0-9]+/g,'').slice(data.dialCode.length);
        if(without_dialcode.length>=9){
            this.setState({
                phone: e,
            });
        }
        this.setState({
            phone_input:e,
            dialCode:data.dialCode
        });
    }

    onSubmitForm = () => {
        if (this.state.personToggle) {
            //fiz litsoi
            const data = {
                type: 1,
                fio: this.state.fio,
                phone: this.state.phone,
                username: this.state.username,
                password: this.state.password,
                retry_password: this.state.retry_password,
            };
            this.regAction(data)
        } else {
            //yur litsoi
            const data = {
                type: 2,
                org_name: this.state.org_name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                retry_password: this.state.retry_password,
            };
            this.regAction(data)
        }
    }

    onSubmitFormViaSmsCode = () => {
        this.setState({show: true})
        axios.post(API_REGFISTRATION_SMS, {
            type: this.state.personToggle ? 1 : 2,
            fio: this.state.fio,
            org_name: this.state.org_name,
            email: this.state.email,
            phone: this.state.phone,
            username: this.state.username,
            password: this.state.password,
            retry_password: this.state.retry_password,
            sms_code: this.state.sms_code
        }).then(res => {

            this.setState({show: false})
            if (res.status === 201) {
                localStorage.setItem('token', res.data.access_token);
                this.props.seTisAuthenticated(true);
                this.props.setUserData(res.data)
                this.props.history.push("/account/profile")
            }

        }).catch(err => {
            if (err.response.status === 404) {
                this.setState({
                    errorSms_code: true
                })
            }
            this.setState({show: false})
        })
    }

    backTo = (e) => {
        e.preventDefault();
        this.setState({
            step: 1
        })
    }
    regAction = (data) => {
        this.setState({show: true})
        axios.post(API_REGFISTRATION, data).then(res => {

            this.setState({show: false})
            if (res.status === 203) {
                this.setState({
                    step: 2
                })
            }

        }).catch(err => {
            this.setState({show: false})
            let errTextAll = "";
            NamesState.map(item => {
                this.setState({
                    [item + 'Error']: false,
                    [item + 'ErrorText']: null
                });
            })
            if (err.response !== undefined) {
                let erors = JSON.parse(err.response.data.message);
                Object.keys(erors).map(item => {
                    let errText = "";
                    erors[item].map(itemError => {
                        errTextAll += itemError + ', ';
                        errText += itemError + ', ';
                    })
                    this.setState({
                        [item + 'Error']: true,
                        [item + 'ErrorText']: errText,
                    });

                });
            }

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
                <Typography classes={{root: classes.titleHead}}>
                    Регистрация
                </Typography>
                <Grid container spacing={0} classes={{root: classes.marginBottom}}>
                    <Grid md={12} sm={12} xs={12}>
                        <Paper className={classes.paper}>
                            <br/>

                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                style={{minHeight: 500}}
                            >

                                <Grid item md={4} xs={12} sm={12}>
                                    {this.state.step === 1 && <ValidatorForm
                                        fullWidth
                                        ref="form"
                                        onSubmit={this.onSubmitForm}
                                        onError={errors => console.log(errors)}
                                    >
                                        <ButtonGroup fullWidth aria-label="full width outlined button group"
                                                     classes={{root: classes.ButtonGroup}}>
                                            <Button onClick={this.personToggle}
                                                    classes={{root: this.state.personToggle ? classes.buttonGroupActive : ""}}>Физическое
                                                лицо</Button>
                                            <Button onClick={this.personToggle}
                                                    classes={{root: !this.state.personToggle ? classes.buttonGroupActive : ""}}
                                                    color="secondary">Юридическое лицо</Button>

                                        </ButtonGroup>
                                        {this.state.personToggle ?
                                            <React.Fragment>
                                                {/*<TextValidator*/}
                                                {/*    fullWidth*/}
                                                {/*    id="outlined-bare"*/}
                                                {/*    placeholder={"Ф.И.О"}*/}
                                                {/*    name={"fio"}*/}
                                                {/*    value={this.state.fio}*/}
                                                {/*    onChange={this.handleChange}*/}
                                                {/*    validators={['required']}*/}
                                                {/*    errorMessages={['Это поле обязательно к заполнению']}*/}
                                                {/*    error={this.state.fioError}*/}
                                                {/*    helperText={this.state.fioErrorText}*/}
                                                {/*    margin="dense"*/}
                                                {/*    variant="outlined"*/}
                                                {/*/>*/}
                                                <React.Fragment>
                                                    {/*<MuiPhoneNumber*/}
                                                    {/*    defaultCountry={'ru'}*/}
                                                    {/*    onChange={this.tellChange}*/}
                                                    {/*    fullWidth*/}
                                                    {/*    // id="outlined-bare"*/}
                                                    {/*    // placeholder={"Номер телефона"}*/}
                                                    {/*    // margin="dense"*/}
                                                    {/*    // variant="outlined"*/}
                                                    {/*    // inputClass={""}*/}
                                                    {/*    // name={"phone"}*/}
                                                    {/*    // value={this.state.phone}*/}
                                                    {/*    // error={this.state.phoneError}*/}
                                                    {/*    // helperText={this.state.phoneErrorText}*/}
                                                    {/*    // required*/}
                                                    {/*/>*/}
                                                    {/*    <ReactPhoneInput*/}
                                                    {/*        value={this.state.phone}*/}
                                                    {/*        onChange={this.tellChange} // passed function receives the phone value*/}
                                                    {/*        component={TextField}*/}
                                                    {/*            margin="dense"*/}
                                                    {/*            variant="outlined"*/}
                                                    {/*            name={"phone"}*/}
                                                    {/*        fullWidth*/}
                                                    {/*    />*/}
                                                    <ReactPhoneInput
                                                        component={TextField}
                                                        inputClass={classes.PhoneInputContainer}
                                                        containerStyle={{marginTop: 5}}
                                                        defaultCountry={'ru'}
                                                        value={this.state.phone_input}
                                                        inputExtraProps={{
                                                            name: 'phone',
                                                            required: true,
                                                            autoFocus: true
                                                        }}
                                                        isValid={(inputNumber, onlyCountries) => {
                                                            let without_dialcode = inputNumber.replace(/[^0-9]+/g,'').slice(this.state.dialCode.length);
                                                            return without_dialcode.length<9 ? false : true;
                                                        }}
                                                        error={this.state.phoneError}
                                                        helperText={this.state.phoneErrorText}
                                                        onChange={this.tellChange}/>

                                                </React.Fragment>
                                                {/*<TextValidator*/}
                                                {/*    fullWidth*/}
                                                {/*    id="outlined-bare"*/}
                                                {/*    placeholder={"Номер телефона"}*/}
                                                {/*    margin="dense"*/}
                                                {/*    variant="outlined"*/}
                                                {/*    name={"phone"}*/}
                                                {/*    onChange={this.handleChange}*/}
                                                {/*    value={this.state.phone}*/}
                                                {/*    error={this.state.phoneError}*/}
                                                {/*    helperText={this.state.phoneErrorText}*/}
                                                {/*    validators={['required']}*/}
                                                {/*    errorMessages={['Это поле обязательно к заполнению']}*/}
                                                {/*/>*/}
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <TextValidator
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"Название организация"}
                                                    margin="dense"
                                                    name={"org_name"}
                                                    value={this.state.org_name}
                                                    error={this.state.org_nameError}
                                                    helperText={this.state.org_nameErrorText}
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    validators={['required']}
                                                    errorMessages={['Это поле обязательно к заполнению']}
                                                />
                                                <TextValidator
                                                    fullWidth
                                                    id="outlined-bare"
                                                    placeholder={"E-mail"}
                                                    name={"email"}
                                                    value={this.state.email}
                                                    error={this.state.emailError}
                                                    helperText={this.state.emailErrorText}
                                                    onChange={this.handleChange}
                                                    margin="dense"
                                                    variant="outlined"
                                                    validators={['required', 'isEmail']}
                                                    errorMessages={['Это поле обязательно к заполнению', 'Email не является допустимым']}
                                                />
                                            </React.Fragment>
                                        }

                                        <TextValidator
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Придумайте логин/имя пользователя"}
                                            variant="outlined"
                                            name={"username"}
                                            value={this.state.username}
                                            autoComplete='off'
                                            error={this.state.usernameError}
                                            helperText={this.state.usernameErrorText}
                                            onChange={this.handleChange}
                                            margin="dense"
                                        />
                                        <TextValidator
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Пароль"}
                                            autoComplete='off'
                                            variant="outlined"
                                            margin="dense"
                                            name={"password"}
                                            value={this.state.password}
                                            error={this.state.passwordError}
                                            helperText={this.state.passwordErrorText}
                                            onChange={this.handleChange}
                                            type={"password"}

                                        />
                                        <TextValidator
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Повторите пароль"}
                                            autoComplete='off'
                                            name={"retry_password"}
                                            value={this.state.retry_password}
                                            onChange={this.handleChange}
                                            type={"password"}
                                            error={this.state.retry_passwordError}
                                            helperText={this.state.retry_passwordErrorText}
                                            variant="outlined"
                                            margin="dense"

                                        />
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="flex-start"

                                        >

                                            <Grid item md={12}>
                                                <Button
                                                    disabled={this.state.show}
                                                    variant="contained" color="secondary" style={{marginTop: 10}}
                                                    type={"submit"}
                                                    classes={{root: classes.regBtns}} fullWidth>
                                                    Зарегистрироваться
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </ValidatorForm>}
                                    {this.state.step === 2 && <ValidatorForm
                                        fullWidth
                                        ref="form"
                                        onSubmit={this.onSubmitFormViaSmsCode}
                                        onError={errors => console.log(errors)}
                                    >
                                        <TextValidator
                                            fullWidth
                                            id="outlined-bare"
                                            placeholder={"Код подтверждения"}
                                            className={classes.textField}
                                            margin="normal"
                                            error={this.state.errorSms_code}
                                            helperText={this.state.errorSms_code && "Код подтверждения не верный"}
                                            name={"sms_code"}
                                            value={this.state.sms_code}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            validators={['required']}
                                            errorMessages={['Это поле обязательно к заполнению']}
                                            inputProps={{
                                                style: {
                                                    height: 40,
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
                                                <Button color="primary" variant={"outlined"} fullWidth classes={{
                                                    outlinedPrimary: classes.outlinedPrimary, root: classes.regBtns
                                                }}
                                                        onClick={this.backTo}
                                                >
                                                    Назад
                                                </Button>
                                            </Grid>
                                            <Grid item md={8}>
                                                <Button variant="contained" color="secondary" fullWidth
                                                        disabled={this.state.show}
                                                        classes={{root: classes.regBtns}} type={"submit"}
                                                        disabled={this.state.show}>
                                                    Зарегистрироваться
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </ValidatorForm>}

                                    <div>
                                        <Typography classes={{root: classes.textP}}>
                                            Все права защищены. Используя сайт, вы обязуетесь выполнять условия <Link
                                            to={"/license"} className={classes.textA}>Пользовательского
                                            соглашения.</Link></Typography>

                                    </div>
                                </Grid>


                            </Grid>


                            <Grid
                                container
                                direction="row"

                            >
                                <Grid md={12}>
                                    <Divider variant="fullWidth" component="hr" style={{marginBottom: 10}}/>
                                </Grid>
                                <Grid md={6} sm={12} xs={12} className={classes.copyright}>
                                    <Typography classes={{root: classes.CopyRight}} gutterBottom>
                                        OOO "Umnenie" (с) {new Date().getFullYear()}
                                    </Typography>
                                </Grid>
                                <Grid md={6} sm={12} xs={12} className={classes.callCenter}>
                                    <Link to={"/"} className={classes.support}>Обратиться в службу поддержки</Link>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }

}


function mapDispatch(dispatch) {
    return bindActionCreators({setIsAuth, seTisAuthenticated, setUserData}, dispatch);
}

function mapStateToProps(state) {
    return {
        isAuth: state.mainData.isAuth,
        user: state.mainData.user
    };
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Registration));