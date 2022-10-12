import React,{Component} from 'react';
import Routes from "./routes"



class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

    render() {

 

        return ( 
          <Routes/>   
        );
    }
}


export default App;