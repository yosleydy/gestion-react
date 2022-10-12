import React, { Component } from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alerts from './../commons/alerts';
import {summary} from './../../actions/summary'
import TableNavegation from '../table'
import {setLoader} from './../../actions/loader'
import {getChangeReportStatus} from '../../actions/reports'
import {setError} from './../../actions/error'

import './index.css';
import { ALERTS_LABELS, LABEL, CLOSE, PROCESS } from './../../constants'

const PAYSTATUS = [
    {
        name: 'NO VERIFICADO',
        value: 0
    },
    {
        name: 'APLICADO',
        value: 1
    },
    {
        name: 'NO APLICADO',
        value: 2
    },
];

class index extends Component {

    constructor (props) {
        super(props);
        this.state=({
            payStatus: 1,
            reportStatus: 3,
            reportDisplay: 'PROCESADO',
            comment: LABEL.SUCCESS_PAYMENT
        })
    }

    handleChangeReportStatus = () =>{
        const propsAlert = {
            title : ALERTS_LABELS.TITLE_SUCCESS,
            dialog : ALERTS_LABELS.CHANGE_STATUS_CONFIRMATION,
            leftButton : ALERTS_LABELS.CANCEL,
            rightButton : ALERTS_LABELS.ACCEPT,
            leftWay : CLOSE,
            rightWay : PROCESS,
        }    
        this.props.setError(true,propsAlert)    
    }

    onStatusChance (event) {
        this.setState({
            [event.target.name]: event.target.value,            
        })

        if(event.target.name === 'payStatus'){
            var comment = '';
            if(event.target.value === 1 || event.target.value === 2){
                if(event.target.value === 1){
                    comment = LABEL.SUCCESS_PAYMENT;
                }else{
                    comment = LABEL.UNSUCCESS_PAYMENT;
                }

                this.setState({
                    reportStatus : 3,
                    reportDisplay : 'PROCESADO',
                    comment: comment,
                })
            }else {
             
                this.setState({
                    reportStatus : 2,
                    reportDisplay : 'PENDIENTE',
                    comment : LABEL.UNVERIFIED_PAYMENT,    
                })
            }
        }


    }


    render() {

        return (
            <div>    

                { this.props.errorData &&
                      <Alerts 
                        title = {this.props.errorData.title}
                        dialog = {this.props.errorData.dialog}
                        leftButton = {this.props.errorData.leftButton}
                        rightButton = {this.props.errorData.rightButton}
                        leftWay = {this.props.errorData.leftWay}
                        rightWay = {this.props.errorData.rightWay}
                        idReport = {this.props.idReport}
                        reportStatus = {this.state.reportStatus}
                        payStatus = {this.state.payStatus}
                        comment = {this.state.comment}
                      />
                }
     
                {this.props.reportData &&

                <div>
                <h2 id = "headerNavegation" style = {{marginTop: 10}}>{'Número de reporte: ' + this.props.idReport }</h2>
                <h4 id = "headerNavegation" style = {{marginTop: -15}}>Resumen de la transacción</h4>

                <Grid container spacing={16}>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ID}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ID}
                            value={this.props.reportData[0].custPrefixid + '-' + this.props.reportData[0].custId}
                            readonly
                            fullWidth
                            InputProps={{
                                className: "withInput",
                            }}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.GSM}
                            style={{ margin: 1 }}
                            placeholder={LABEL.GSM}
                            value={this.props.reportData[0].custGsm}
                            readonly
                            fullWidth
                            InputProps={{
                                className: "withInput",
                            }}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.BANK_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.BANK_ACCOUNT}
                            value={this.props.reportData[0].bankName}
                            readonly
                            fullWidth
                            InputProps={{
                                className: "withInput",
                            }}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.LAST_ACCOUNT_DIGITS}
                            style={{ margin: 1 }}
                            placeholder={LABEL.LAST_ACCOUNT_DIGITS}
                            value={this.props.reportData[0].bankAccount}
                            readonly
                            fullWidth
                            InputProps={{
                                className: "withInput",
                            }}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.AMOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.AMOUNT}
                            value={'Bs. ' + this.props.reportData[0].amount}
                            readonly
                            fullWidth
                            InputProps={{
                                className: "withInput",
                            }}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.REFERENCE}
                            style={{ margin: 1 }}
                            placeholder={LABEL.REFERENCE}
                            value={this.props.reportData[0].transferReference}
                            readonly
                            fullWidth
                            InputProps={{
                                className: "withInput",
                            }}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.PAYMENT_DATE}
                            style={{ margin: 1 }}
                            placeholder={LABEL.PAYMENT_DATE}
                            value={new Date(this.props.reportData[0].transferDate).toLocaleDateString()}
                            readonly
                            fullWidth
                            InputProps={{
                                className: "withInput",
                            }}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                                id="outlined-full-width"
                                label={LABEL.REPORT_STATUS}
                                style={{ margin: 1 }}
                                placeholder={LABEL.REPORT_STATUS}
                                value={this.props.reportData[0].reportStatus === 0 ? 'ABIERTO' :
                                    this.props.reportData[0].reportStatus === 1 ? 'EN PROCESO' :
                                    this.props.reportData[0].reportStatus === 2 ? 'PENDIENTE' :
                                    'PROCESADO' 
                                    }
                                readonly
                                fullWidth
                                InputProps={{
                                    className: "withInput",
                                }}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                    
                            <TextField
                                id="outlined-full-width"
                                label={LABEL.PAYMENT_STATUS}
                                style={{ margin: 1 }}
                                placeholder={LABEL.PAYMENT_STATUS}
                                value={this.props.reportData[0].payStatus === 0 ? 'NO VERIFICADO' :
                                    this.props.reportData[0].payStatus === 1 ? 'APLICADO' : 'NO APLICADO'
                                    }
                                readonly
                                fullWidth
                                InputProps={{
                                    className: "withInput",
                                }}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>


                </Grid>

                {this.props.reportData[0].reportStatus !== 3 &&
  
                    <div>       
                        <Divider style = {{marginTop : 10,marginBottom: 10}}></Divider>
                        <h4 id = "headerNavegation" >Nuevo estatus para la transacción</h4>
                        <Grid container spacing={16}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    style = {{marginBottom: '10px !important'}}
                                    select
                                    name = "payStatus"
                                    fullWidth
                                    InputProps={{
                                        className: "withInput",
                                    }}
                                    variant="outlined"
                                    value={this.state.payStatus}
                                    onChange={event => this.onStatusChance(event)}
                                >
                                    {PAYSTATUS.map(element =>
                                        <MenuItem key = {element.value} value = {element.value}>
                                                {element.name}
                                        </MenuItem>
                                    )}
                            
                                
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>

                                <TextField
                                    id="outlined-full-width"
                                    label={LABEL.REPORT_STATUS}
                                    style={{ margin: 1 }}
                                    placeholder={LABEL.REPORT_STATUS}
                                    value={this.state.reportDisplay}
                                    readonly
                                    fullWidth
                                    InputProps={{
                                        className: "withInput",
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                    
                                                     
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                 <TextField
                                    id="outlined-full-width"
                                    label={LABEL.COMMENT}
                                    style={{ margin: 1 }}
                                    placeholder={LABEL.COMMENT}
                                    value={this.state.comment}
                                    fullWidth
                                    name = 'comment'
                                    onChange={event => this.onStatusChance(event)}
                                    variant="outlined"
                                    multiline={true}
                                    rows={2}
                                    rowsMax={4}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            </Grid>
                    </div>
                }
                            <ExpansionPanel style = {{marginTop: '5px'}}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                   <Typography >Bitácora del reporte</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TableNavegation/>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                    {this.props.reportData[0].reportStatus !== 3 &&
  
                        <div>
                             <Grid container spacing={16}>

                            <Grid 
                                container 
                                style = {{
                                    marginTop: '15px', 
                                
                                }}   
                            
                                alignItems="center"
                                justify="center"
                            >
   
                                <Button 
                                    style = {{
                                        width : '200px',
                                        height: '50px !important'
                                    }}
                                    variant="contained" 
                                    size="large" 
                                    color="primary" 
                                    onClick={this.handleChangeReportStatus}
                                >
                                    Aceptar
                                </Button>
                             </Grid>
                        </Grid>
                    </div>
                }

            </div>
        }
    </div>
    );
    }
}

function mapStateToProps(state) {
    return {
        idReport : state.summary.idReport,
        binnacle : state.summary.binnacle,
        reportData : state.summary.report,
        loader: state.loader.loader,
        errorData: state.error.errorData,
    };
  }

  
  export default connect(mapStateToProps,
    {
        summary,
        getChangeReportStatus,
        setLoader,
        setError
    })(index);


