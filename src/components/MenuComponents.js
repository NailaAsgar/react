import React, {Component} from 'react';
import { render } from "@testing-library/react";
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import Dishdetail from '../components/DishdetailComponent';


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish:null   //current state of selected-dish is null
        }
    }
    onDishSelect(dish) {
        this.setState({selectedDish: dish})    //modify the state of selected-dish
    }
    renderDish(dish) {                    //if dish is selected
        if (dish!=null) {
            return (
                <Dishdetail value={dish}/>
            );
        }
        else {                       //if not selected
            return (
                <div></div>
            );
        }
    }

    render() {
        const menu = this.props.dish.map((dish) => {            //iterate in all the dishes
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>   
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                       <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                       </CardImgOverlay>      
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div class="row">
                    <Dishdetail dish = {this.state.selectedDish}/>
                </div>
            </div>
        );
    }

}

export default Menu;