import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {getReports,getReport,resetReports} from './../../actions/reports'
import {setError} from './../../actions/error'
import {setHeaderNavegation} from './../../actions/headerNavegation'
import {setLoader} from './../../actions/loader'
import {summary} from './../../actions/summary'
import Summary from './../summary'

import './index.css';
import { ALERTS_LABELS, CLOSE_REPORT } from './../../constants'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

const propsAlert = {
    title : ALERTS_LABELS.TITLE_SUCCESS,
    dialog : ALERTS_LABELS.WITH_OUT_RESULTS,
    leftButton : "",
    rightButton : ALERTS_LABELS.ACCEPT,
    leftWay : CLOSE_REPORT,
    rightWay : CLOSE_REPORT
  }

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class report extends React.Component {

    
  constructor (props) {
    super(props);
    this.state = ({
        page: 0,
        rowsPerPage: 10,
        summary: false,
    })
    }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleAlert = () => {
    this.props.setError(true,propsAlert)
  };

  handleClicked = (idReport,status) => {
    var endpoint = 1;
    this.props.setLoader(true)
    this.setState({
        summary: true
    })
    if (status === 0 || status === 2){        
        endpoint = 2;
    }
    this.props.resetReports()
    this.props.getReport(idReport,localStorage.getItem('user'),this.props.headerNavegation + ' | Reporte: ' + idReport, endpoint)
   
}

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const {  rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.length - page * rowsPerPage);
    console.log("encabezado: "+this.props.headerNavegation )
    console.log("report: "+this.props.report )
    return (
        <div>

        {this.props.report && this.props.rows.length < 0 ? console.log(this.handleAlert()) : <div/>}
    
        { this.props.report && this.props.rows.length > 0  &&
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.root} >
                        <div className={classes.tableWrapper}>
                        <Table style = {{textAlign: 'center'}} className={classes.table}>
                            <TableHead >
                                <TableRow >                                         
                                    <TableCell id="tableHead" align="center">REPORTE</TableCell>
                                    
                                    <TableCell id="tableHead" align="center">GSM</TableCell>
                                    <TableCell id="tableHead" align="center">MONTO</TableCell>
                                    <TableCell id="tableHead" align="center">FECHA DE TRANSFERENCIA</TableCell>
                                    <TableCell id="tableHead" align="center">ESTATUS DE PAGO</TableCell>
                                    <TableCell id="tableHead" align="center">ESTATUS DE REPORTE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                <TableRow style={{height: 0}} onClick = {this.handleClicked.bind(this,row.idReport,row.reportStatus)} className = "tableRow"  key={row.idReport}>
                                <TableCell align="right">
                                    {row.idReport}
                                </TableCell>
                                <TableCell align="center">{row.custGsm}</TableCell>
                                <TableCell align="center">{row.amount}</TableCell>
                                <TableCell align="center">{new Date(row.transferDate).toLocaleDateString()}</TableCell>
                                <TableCell align="center">{
                                    row.payStatus === 1 ? 'APLICADO' :  
                                    row.payStatus === 2 ? 'NO APLICADO' :  'NO VERIFICADO'
                                                                                 
                                }</TableCell>
                                <TableCell align="center">{
                                    row.reportStatus === 1 ? 'EN PROCESO' :  
                                    row.reportStatus === 2 ? 'PENDIENTE' :  
                                    row.reportStatus === 3 ? 'PROCESADO' : 'ABIERTO'
                                }</TableCell>

                             
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            </TableBody>
                            <TableFooter>
                            <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[10, 25]}
                                colSpan={3}
                                count={this.props.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    native: true,
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                            </TableFooter>
                        </Table>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        
            
       
        }


        {this.state.summary ?           
            <Summary/>
        :
            <div/>

        }



      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log('state reporte'+state.reports.report);
    return {
        noContent: state.reports.noContent,
        report : state.reports.report,
        rows : state.reports.reports,
        length: state.reports.length,
        errorData: state.error.errorData,
        headerNavegation: state.setHeaderNavegation.name,
        loader: state.loader.loader,
        summary : state.summary.summary,
    };
  }
  
  const Report = withStyles(styles, { withTheme: true })(report);
  
  export default connect(mapStateToProps,
    {
        getReports,
        setError,
        setHeaderNavegation,
        setLoader,
        getReport,
        resetReports,
        summary,
    })(Report);