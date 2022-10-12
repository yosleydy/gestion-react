import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {LABEL} from './constants'

import './index.css'
class testApp extends Component {
    render() {


        return (
            <div>

                <h2 id = "customerData">Resumen de la transaccion</h2>
                <h3 id = "customerData">Número de pedido </h3>
                <Grid container spacing={16}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                <Divider style = {{marginTop : 25,marginBottom: 25}}></Divider>

                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Bitacora del reporte</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Divider style = {{marginTop : 25,marginBottom: 25}}></Divider>

                <Grid container spacing={16}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label={LABEL.CUSTOMER_ACCOUNT}
                            style={{ margin: 1 }}
                            placeholder={LABEL.CUSTOMER_ACCOUNT}
                            value={'010101010919'}
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

                <Grid 
                    container 
                    style = {{
                         marginTop: '15px', 
                         marginBottom: '35px'
                    }}   
                
                    alignItems="center"
                    justify="center">
   
                        <Button 
                            style = {{
                                width : '200px',
                                height: '50px !important'
                            }}
                            variant="contained" 
                            size="large" 
                            color="primary" 
                            onClick={this.bulkOrderSale}
                         >
                             Aceptar
                        </Button>
                </Grid>



            </div>
        );
    }
}



export default testApp;