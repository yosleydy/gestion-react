import { createMuiTheme } from '@material-ui/core/styles';



/* Bar Constants (component/home)*/

const drawerWidth = 360;
export const BARSTYLES = theme => ({

  body :{
    background: 'none !important',
  },
  grow: {
    flexGrow: 1,
  },
  nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  menuItem: {
      '&:focus': {
        backgroundColor: '#5c068c',
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {},
    icon: {},

    root: {
      display: 'flex',
      flexGrow: 1,
      
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing.unit * 7 + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9 + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis: 200,
      height:'30px !important'
    },
    withInput: {
      width: '100%',
      height: 40,
    }

});


/* Theme constant*/

export const theme = createMuiTheme({
      
    palette: {
      primary: {
        main: '#5c068c',
      },
      secondary: {
        main: '#d50032',
      }
    },
  
  });