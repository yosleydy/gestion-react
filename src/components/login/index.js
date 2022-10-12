import React, { Component } from 'react';
import {connect} from 'react-redux';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Logo from './img/g.png';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {loginAuthetication} from '../../actions/login'
import {setError} from './../../actions/error'
import Alerts from './../commons/alerts'
import {USERNAME_LABEL, 
    USERNAME_PLACEHOLDER,
    USER_ICON, 
    PASSWORD_LABEL, 
    PASSWORD_PLACEHOLDER, 
    PASSWORD_ICON, 
    LOGIN_BUTTON_NAME,
    THEME,LOGIN_TITLE
    } 
from '../../constants'
import './index.css'

import { ALERTS_LABELS, CLOSE } from './../../constants'

class index extends Component {
    constructor(props){
        super(props);
        this.state = {
          username : '',
          password : ''
        }
    }

    onChange (event){
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

     //Función que controla la petición de login
  handleSubmit = async event => {
    event.preventDefault();
      var dialog = '';
      var propsAlert = {};
      if (this.state.username === ''){
          dialog = ALERTS_LABELS.USERNAME_REQUIRED;
      }else if (this.state.password === '') {
          dialog = ALERTS_LABELS.PASSWORD_REQUIRED;
      }  

      if (dialog !== ''){
        propsAlert = {
          title : ALERTS_LABELS.TITLE_ERROR,
          dialog : dialog,
          leftButton : null,
          rightButton : ALERTS_LABELS.ACCEPT,
        }
        return this.props.setError(true,propsAlert);       
      }

    await  
    this.props.loginAuthetication(this.state.username,this.state.password);
  }

    render() {
     
 
        return (
            <div id = "container" className = "body">
  
                <MuiThemeProvider theme={THEME}>

                { this.props.errorData &&
                    <Alerts 
                    title = {this.props.errorData.title}
                    dialog = {this.props.errorData.dialog}
                    leftButton = {this.props.errorData.leftButton}
                    rightButton = {this.props.errorData.rightButton}
                    leftWay = {CLOSE}
                    rightWay = {CLOSE}
                    />
                }

                <Slide direction="right" in={true}>
                    <div className = "form">
                        <div className = "formContainer">
                            <img alt="Digitel" src = {Logo} className = "logo"/>
                        
                        <div className="title">
                            <Typography 
                                style = {{color : 'white'}} 
                                variant="h5" 
                                gutterBottom
                            >
                                {LOGIN_TITLE}
                            </Typography>
                        </div>

                        <form className = "formColor" onSubmit = {this.handleSubmit}  autocomplete="off">

                            <Grid direction='column' alignItems="center" justify="center" item xs={12} sm = {12} md={12}  >
                            <TextField
                                className="inputColor"  
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">                                 
                                        <Icon>{USER_ICON}</Icon>                                  
                                    </InputAdornment>
                                    ),                                
                                }}
                                placeholder = {USERNAME_PLACEHOLDER}
                                id= "outlined-input"
                                label= {USERNAME_LABEL}
                                type= "text"
                                margin = "normal"
                                variant = "outlined"
                                value = {this.state.username}
                                onChange = {event => this.onChange(event)}
                                name = "username"
                                
                            />
                            </Grid>

                            <Grid direction='column' alignItems="center" justify="center" item xs={12} sm = {12} md={12}  >
                            <TextField
                                className="inputColor"  
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon>{PASSWORD_ICON}</Icon>                               
                                    </InputAdornment>
                                    ),
                                }}
                                placeholder = {PASSWORD_PLACEHOLDER}
                                id= "outlined-password-input"
                                label= {PASSWORD_LABEL}
                                type= "password"
                                margin = "normal"
                                variant = "outlined"
                                value = {this.state.password}
                                onChange = {event => this.onChange(event)}
                                name = "password"
                                
                            />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type = "submit" variant="outlined" size="large"  className = "digiButton">
                                    {LOGIN_BUTTON_NAME}                            
                                </Button>              
                            </Grid>

                        </form>
                        </div>
                    </div>
                </Slide>
                </MuiThemeProvider>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      error: state.error.error,
      errorData: state.error.errorData,
    };
  }

const Index = withStyles(THEME, { withTheme: true })(index);

export default connect(
    mapStateToProps, 
    { 
      setError,
      loginAuthetication,
    }
  )(Index);


