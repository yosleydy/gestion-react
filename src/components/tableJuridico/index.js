import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
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
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import TableHead from '@material-ui/core/TableHead';
import {BITACORA_REPORT_ENDPOINT} from './../../constants';
import {summary} from './../../actions/summary';


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

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

class table extends React.Component {
    constructor (props) {
        super(props);
        this.state = ({
            page: 0,
            rowsPerPage: 5,
            summary: false,
            items: []
        })
    }

componentDidMount() {
      fetch(BITACORA_REPORT_ENDPOINT+"?id="+this.props.idReport)
        .then(res => res.json())
        .then(
          (result) => {
              console.log('result'+result);
            this.setState({
              items: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
}

formatofecha = (fecha) => {
  if(fecha.indexOf('-') >- 1){
    return fecha.split("-").reverse().join("/")
  }else{
    return new Date(fecha).toLocaleDateString()
  }
};

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const {  rowsPerPage, page, items } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.items.length - page * rowsPerPage);
    return (

        <div>
        {this.state.items.length > 0  &&
     
        <Grid style={{marginTop: -40}} item xs={12} sm={12}>
            <Paper className={classes.root} >
                <div className={classes.tableWrapper}>
                <Table >
                    <TableHead >
                        <TableRow>                                     
                            <TableCell id="tableHead" align="center" style={{"width":"10%"}}>REPORTE</TableCell>
                            <TableCell id="tableHead" align="center">ESTATUS DE PAGO</TableCell>
                            <TableCell id="tableHead" align="center">ESTATUS DEL REPORTE</TableCell>
                            <TableCell id="tableHead" align="center">ESTATUS DE RETENCIÓN</TableCell>
                            <TableCell id="tableHead" align="center">COMENTARIO</TableCell>
                            <TableCell id="tableHead" align="center">NOMBRE DE USUARIO</TableCell>
                            <TableCell id="tableHead" align="center">FECHA DE LA TRANSACCIÓN</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                        <TableRow className = "tableRow"  key={row.idReport}>
                        <TableCell align="right">
                            {row.idReport}
                        </TableCell>
                        <TableCell align="center">{
                            row.newPayStatus === 1 ? 'APLICADO' :  
                            row.newPayStatus === 2 ? 'NO APLICADO' :  'NO VERIFICADO'
                                                                         
                        }</TableCell>
                        <TableCell align="center">{
                            row.newReportStatus === 1 ? 'EN PROCESO' :  
                            row.newReportStatus === 2 ? 'PENDIENTE' :  
                            row.newReportStatus === 3 ? 'PROCESADO' : 'ABIERTO'
                        }</TableCell>
                        <TableCell align="center">{
                            row.newRetentionStatus === 0 ? 'NO VERIFICADO' :  
                            row.newRetentionStatus === 1 ? 'APLICADO' :  
                            row.newRetentionStatus === 2 ? 'NO APLICADO' : ''
                        }</TableCell>
                        <TableCell align="center">{row.textComment}</TableCell>
                        <TableCell align="center">{row.createdWho}</TableCell>
                        <TableCell align="center">{this.formatofecha(row.createdDt)}</TableCell>
                     
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
                        rowsPerPageOptions={[5,10, 25]}
                        colSpan={3}
                        count={this.state.items.length}
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
  
    }
    </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        idReport : state.summary.idReport,
        //length: state.summary.length,
    };
  }
  
  const TableJuridico = withStyles(styles, { withTheme: true })(table);
  
  export default connect(mapStateToProps,
    {
        summary,
    })(TableJuridico);