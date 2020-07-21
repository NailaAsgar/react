import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import { Navbar, NavbarBrand} from 'reactstrap';
import Menu from './components/MenuComponents';
import './App.css';
import { DISHES } from './shared/dishes';


class App extends React.Component {

  constructor(props) { //lifted dishes to app.js file
    super(props);

    this.state = {
      dishes:DISHES
    };
  }
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}/>
      </div>
    );
  }
  
}

export default App;
