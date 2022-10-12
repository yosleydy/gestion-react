import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AccountCircle from '@material-ui/icons/AccountCircle';
import history from '../../history';
import {connect} from 'react-redux';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';
import { resetAll } from '../../actions/all'
import { logout } from '../../actions/logout'
import {LABEL,EXPIRATION_TIME} from './../../constants'
import {BARSTYLES,theme} from './css.js';
import Alerts from './../commons/alerts';
import {setError} from './../../actions/error';
import Report from './../reports';
import ReportJuridico from './../reportsJuridico'
import {getReports} from './../../actions/reports';
import {getReportsJuridico} from './../../actions/reports';
import {setLoader} from './../../actions/loader'
import {setSearch} from './../../actions/search'
import {setHeaderNavegation} from './../../actions/headerNavegation'
import Search from './../search'
import SearchJuridico from './../searchJuridico'
import {summary} from './../../actions/summary'
import {summaryJuridico} from './../../actions/summaryJuridico'

import './index.css'

const initialState = [
  false,
  false,
  false,
  false,
  false,
  false,
];


class Home extends Component {

      constructor (props){
        super(props);
        this.state = ({
          expanded: false,
          expandedList: initialState,
          open: true,
          weightRange: '',
          auth: true,
          anchorEl: null,
          search: false,
          searchJuridico: false,
          reports: false,
          juridicos: false,
        })        
      }

      componentDidMount (){
        this.props.setLoader(true);
        this.setState({expandedList: [false, false, false, false, false, false]})
        //this.props.getReports(localStorage.getItem('user'),0,1,'Gestión de pagos')
      }

      //Función para definir y estructurar los elementos del menú que estará disponible para el usuario
      mainElements(){
        
        const { classes } = this.props;
        const icon = <KeyboardArrowRight />;
        const getMain = localStorage.getItem('main');
        const main = JSON.parse(getMain);
        var parents = [];
        var childs = [];
 
        for(var i = 0; i < main.length; i++) {
          var obj = main[i];
         
          if(obj.parent_id === 'ROOT'){
                         
            parents.push({'display_value': obj.display_value, 'id_menu' : obj.id_menu}) ;
 
          }else{
            childs.push({'display_value': obj.display_value, 'parent_id' : obj.parent_id, 
                         'react_component': obj.react_component, 'process_name': obj.process_name});
  
          }
        }

        return (
          
            <div>
             {parents.map((obj,index )=> 
              <div>
               <MenuList>
               <MenuItem id = {index} className={classes.menuItem} onClick={event => this.handleClick(index)}>
                 <ListItemIcon className={classes.icon}>
                   <InboxIcon />
                 </ListItemIcon>
             
                 <ListItemText classes={{ primary: classes.primary }} inset primary={obj.display_value} />
                 <ExpandMore/>
               </MenuItem>
             </MenuList>

             <Collapse in={this.state.expandedList[index]} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
               {childs.map((object, i) => 
                    (object.parent_id === obj.id_menu &&
                      <ListItem obj={object.display_value} key={i} button className={classes.nested}>
                        <ListItemIcon>
                          {icon}
                        </ListItemIcon>
                        <ListItemText inset primary={object.display_value} onClick = {this.handleClose.bind(this,object.react_component, object.parent_id, object.display_value)}/>
                      </ListItem>

                    )     
               )}   
             </List>
             </Collapse>
             </div>
               )}
            
            </div>
          )
      }

      //Funciones que controlan  el estado de los elementos de tipo botón disponibles en el dashboard
      handleChangeAccount = event => {
        this.setState({ auth: event.target.checked });
      };
    
      handleMenuAccount = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleCloseAccount = () => {
        this.setState({ anchorEl: null });
      }

      handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
       };

      handleDrawerOpen = () => {
        this.setState({ 
          open: true 
        });
      };

      handleDrawerClose = () => {
        this.setState({ 
          open: false 
        });
      };
      
      handleClick = (index) => {
        var { expandedList } = this.state;  
        expandedList[index] = !expandedList[index]
       

        this.setState({ 
            expandedList: expandedList,
            open: true,
            expandedMenu: !this.state.expandedMenu, 
        });
      };  

      /*función que controla el cierre de sesión de usuario, aplicanod reset de todos 
      los datos de la misma y redirect al login de la aplicación*/
      handleLogout = () => {
        this.setState({ anchorEl: null});
        localStorage.clear();
        this.props.setHeaderNavegation('');
        this.props.logout();
        history.push('/rt-front/')
      };

      /*Funcion que controla los estados de elementos propios del menú, 
      adicionalmente desmonta cualquier componente que no corresponda */
      handleClose = (component,parent_id, process,event) => {

        event.preventDefault();
        var states = {};
        var level = 0;
        var status = 1;

        switch (component) {
          case 'SearchComponent':
            if (parent_id === 'MNU011') {
              states = {
                open: false,
                expanded: false,
                expandedMenu: false,
                expandedList: [false,false,false] ,
                search: false,
                searchJuridico:true,
              }
            }else{
              states = {
                open: false,
                expanded: false,
                expandedMenu: false,
                expandedList: [false,false,false] ,
                search: true,
                searchJuridico:false,
              }
            }
            
          
            break;
          case 'ReportComponent':
            states = {
              open: false,
              expanded: false,
              expandedMenu: false,
              expandedList: [false,false,false] ,
              reports: true,
              juridicos: true,
              search:false,
              searchJuridico:false,
            }

            switch (process) {
              case 'Gestión de pagos jurídicos':
                 status = 4;
                 level = 1;
                break;
              case 'Gestión de pagos':
                 status = 0;
                 level = 1;
                break;
              case 'Reportes en proceso':
                 status = 1;
                break;
              case 'Reportes pendientes':
                 status = 2;
                break;
              case 'Reportes procesados':
                 status = 3;
                break;

              default:
                break;
            }
            break;
        
          default:
            break;
        }


        this.setState(
          states     
        );

        if (component === 'ReportComponent' && process === 'Gestión de pagos jurídicos') {
          states.reports = false;
          states.juridicos = true;
          this.props.getReportsJuridico(localStorage.getItem('user'),process,status);
          this.props.setLoader(true); 

        }else if (component === 'ReportComponent' && parent_id === 'MNU011' ) {
          states.reports = false;
          states.juridicos = true;
          this.props.getReportsJuridico(localStorage.getItem('user'),process,status);
          this.props.setLoader(true); 

        }else if (component === 'ReportComponent') {
          states.reports = true;
          states.juridicos = false;
          this.props.getReports(localStorage.getItem('user'),status,level,process);
          this.props.setLoader(true); 
        }
        this.props.resetAll();  

        if(component === 'SearchComponent'){
          this.props.setHeaderNavegation(process);
          this.props.setSearch(true);
        }
          
    

      };

      /*Función que se encarga de validar si existe una sesión 
      (para redireccionar a otra ruta de ser necesario).*/
      isAutheticated(){
        const autheticated = localStorage.getItem('user');
        if (localStorage.getItem('user')!= null){
          this.startExpiration()
        }
        return autheticated && autheticated.length > 0;
      }

      startExpiration (){

        var fecha = new Date();
        fecha.setMinutes(fecha.getMinutes()+EXPIRATION_TIME)
        localStorage.setItem("time",fecha);
        
      }

      render() {
        const isAlreadyAuth = this.isAutheticated();
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const userName = localStorage.getItem('user');

        return (

          <div>

            {!isAlreadyAuth ? history.push('/rt-front/') : 
              <MuiThemeProvider theme={theme}>

                <div className="root" >
                
                { this.props.errorData &&
                      <Alerts 
                        title = {this.props.errorData.title}
                        dialog = {this.props.errorData.dialog}
                        leftButton = {this.props.errorData.leftButton}
                        rightButton = {this.props.errorData.rightButton}
                        leftWay = {this.props.errorData.leftWay}
                        rightWay = {this.props.errorData.rightWay}
                      />
                }


                  <AppBar
                      position="fixed"
                      className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                      })}
                  >
                    <Toolbar disableGutters={!this.state.open}>
                      <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, {
                          [classes.hide]: this.state.open,
                        })}
                      >
                        <MenuIcon/>
                      </IconButton>

                      <Typography variant="h6" color="inherit" className={classes.grow}>
                        {LABEL.DIGITEL_TITLE}
                      </Typography>

                      {auth && (
                        <div>
                          <h5 style ={{display: 'inline-block'}}>{userName}</h5>
                          <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenuAccount}
                            color="inherit"
                            style = {{marginRight: '20px'}}
                          >                          
                            <AccountCircle  />                            
                          </IconButton >
                          
                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleCloseAccount}
                          >
                            <MenuItem onClick={this.handleLogout}>Cerrar Sesión</MenuItem>
                          </Menu>
                        </div>
                      )}
                    </Toolbar>
                  </AppBar>
                  
                  <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                    [classes.drawerOpen]: this.state.open,
                    [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                      paper: classNames({
                      [classes.drawerOpen]: this.state.open,
                      [classes.drawerClose]: !this.state.open,
                      }),
                    }}
                    open={this.state.open}
                  >

                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>

                    <Divider />
                        
                    {this.mainElements()}
              
                  </Drawer>

                  <main className={classes.content}>
                  <div style={{marginTop: 45}}/>

                    <h6 id = "headerNavegation" style = {{textAlign: 'leght'}}>
                      <i>
                        {this.props.headerNavegation}
                      </i>
                    </h6>

                    <Divider style = {{marginTop : -20,marginBottom: -10}}></Divider>
                    {this.props.loader && 
                          <LinearProgress style = {{marginTop: 10,position: "sticky", marginBottom: -10}} /> 
                    }
                   {/* console.log('reporte propue'+this.props.reports), console.log('reporte state'+this.state.reports)*/}
                    {this.props.reports  && this.state.reports ?
                      <Report/>
                      :
                      <div/>
                    }
                    {this.props.reports  && this.state.juridicos ?
                      <ReportJuridico/>
                      :
                      <div/>
                    }
                    {this.state.search &&
                      <Search/>
                    }
                    {this.state.searchJuridico &&
                      <SearchJuridico/>
                    }

                  </main>

                </div>
              </MuiThemeProvider>
            }
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    all: state.all,
    logout: state.logout,
    errorData: state.error.errorData,
    reports: state.reports.reports,
   // reportsJuridico : state.juridicos.reportsJuridico,
    headerNavegation: state.setHeaderNavegation.name,
    loader: state.loader.loader,
    search: state.search.search,
    searchJuridico: state.searchJuridico,
    reportData : state.summary.report,
    //reportJuridicoData : state.summaryJuridico.report,

  };
}

const home = withStyles(BARSTYLES, { withTheme: true })(Home);

export default connect(mapStateToProps,
  {
    getReports,
    getReportsJuridico,
    resetAll, 
    setError,
    logout,
    setLoader,
    setHeaderNavegation, 
    setSearch,
    summary,
    summaryJuridico,
  })(home);
