
import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponents';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';


class Main extends React.Component{

  constructor(props) { //lifted dishes to app.js file
    super(props);

    this.state = {
      dishes:DISHES,   //dishes is array of Dishes
      selectedDish: null,
    };
  }
  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})    //modify the state of selected-dish
    }
  render() {
    return (
    <div>
      <Header/>
      <Menu dishes={this.state.dishes}
         onclick={(dishId) => this.onDishSelect(dishId)}/>
      <DishDetail   // selecting the specific dish, which is the selectedDish and then passing the dish information to the DishdetailComponent.
        dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish) [0]}/>  
       <Footer/> 
    </div>
  );
  }
  
}

export default Main;
