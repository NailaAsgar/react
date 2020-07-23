import React from 'react';
import { render } from "@testing-library/react";
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';


    function RenderMenuItem({ dish, onClick}){    //we can clearly specify wat props parameters are needed.
                                                // this.props is removed because onClick is coming as parameter
        return(
            <Card onClick={() => onClick(dish.id)}>   
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>      
            </Card>
        );

    }  

    const Menu = (props) => {
        const menu = props.dishes.map((dish) => {            //iterate in all the dishes //this is removed because props is comming as parameter
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish} onclick={props.onClick}/>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

export default Menu;