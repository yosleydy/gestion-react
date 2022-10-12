import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {setError} from './../../../actions/error';
import {logout} from './../../../actions/logout';
import {resetAll} from './../../../actions/all';
import {setLoader} from './../../../actions/loader';
import {getChangeReportStatus, getChangeLegalReportStatus} from './../../../actions/reports';


import {CLOSE, CLOSE_REPORT} from './../../../constants'



function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Alerts extends React.Component {

  constructor (props){
    super(props)
    this.state = ({
      open: true,
    })
  }
 
  //Función que controla las acciones o flujos asociados al botón izquierdo en una alerta
  handleLeft= () => {
 
      switch (this.props.leftWay) {
        case CLOSE:
           this.props.setError(false,{});    
          break;

        case CLOSE_REPORT:   
          this.props.setError(false,{});    
          this.props.resetAll();  
         break;

      
        default:
          break;
      }
  }

  //Función que controla las acciones o flujos asociados al botón derecho en una alerta
  handleRight = () => {
    console.log('props.rightway'+this.props.rightWay)
      switch (this.props.rightWay) {
        case CLOSE :         
           this.props.setError(false,{});              
          break;
        
        case CLOSE_REPORT :   
           this.props.setError(false,{});    
           this.props.resetAll();  
          break;

        case 'PROCESS':     
          this.props.setError(false,{}); 
          this.props.getChangeReportStatus(this.props.idReport,this.props.reportStatus,this.props.payStatus,this.props.comment,localStorage.getItem('user'))
          this.props.setLoader(true);  
         break;
         case 'PROCESSJURIDICO':     
         this.props.setError(false,{}); 
         this.props.getChangeLegalReportStatus(this.props.idReport,this.props.reportStatus,this.props.payStatus,this.props.retentionStatus,this.props.comment,localStorage.getItem('user'))
         this.props.setLoader(true);  
        break;
        

        default:
          break;
      }

  };



  render() {

    const {title, dialog, leftButton, rightButton} = this.props;

    return (
      <div>

        <Dialog
          open={this.props.error}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {dialog}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleLeft} color="primary">
              {leftButton}
            </Button>
            <Button onClick={this.handleRight} color="primary">
              {rightButton}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    error: state.error.error,
    logout: state.logout,
  };
}


export default connect(
    mapStateToProps, 
    { 
      setError,
      resetAll,setLoader,
      logout,
      getChangeReportStatus,
      getChangeLegalReportStatus
    }
  )(Alerts);


