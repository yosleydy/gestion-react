import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import {setHeaderNavegation} from './../../actions/headerNavegation'
import {foundReport,resetReports} from './../../actions/reports'
import {setLoader} from './../../actions/loader'
import {setSearch} from './../../actions/search'
import Summary from './../summary'

class Search extends Component {

    constructor (props) {
        super(props)
        this.state = ({
            value: '',
        })
    }

    onValueChange = (event) => {
        this.setState({
          value : event.target.value.toUpperCase()
        })
      }

      handleClicked = () => {
        this.props.setLoader(true)
        this.setState({
            summary: true
        })
        this.props.foundReport(localStorage.getItem('user'),this.props.headerNavegation+' | Reporte: ' + this.state.value, this.state.value)
        this.props.setSearch(false);
    }

    render() {
        return (
            <div>
                {this.props.search &&
                <Grid style = {{marginTop : 20}} container className="root" spacing={16}>
                    <Grid item xs={12} sm={6} md={4}>

                        <TextField                          
                            variant="outlined"
                            label={'Número de reporte'}
                            placeholder={'Número de reporte'}
                            fullWidth = "true"
                            InputProps={{
                                className: "withInput",
                            }}
                            value={this.state.value}
                            onChange={this.onValueChange}                    
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Fab onClick = {this.handleClicked} size="small" color="primary" aria-label="Add">
                            <SearchIcon/>
                        </Fab>
                    </Grid>
                </Grid>
                }

                {this.state.summary &&
                    <Summary/>
                }

                
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        headerNavegation: state.setHeaderNavegation.name,
        search: state.search.search,
    };
  }

export default connect(
    mapStateToProps,{
        setHeaderNavegation, 
        foundReport,
        setLoader,
        resetReports,
        setSearch
    }

)(Search);