
import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponents';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import { Switch, Route,Redirect} from 'react-router-dom';


class Main extends React.Component{

  constructor(props) { //lifted dishes to app.js file
    super(props);

    this.state = {
      dishes:DISHES,   //dishes is array of Dishes
    };
  }

  render() {
    const HomePage = () => {
        return(
            <Home/>
        );
    }
    return (
    <div>
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />    
        <Redirect to='/home'/>
      </Switch> 
       <Footer/> 
    </div>
  );
  }
  
}

export default Main;
