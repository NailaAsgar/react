import React from 'react';
import { render } from "@testing-library/react";
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

    function RenderMenuItem({ dish}){    //we can clearly specify wat props parameters are needed.
                                                // this.props is removed because onClick is coming as parameter
        return(
            <Card> 
                <Link to={`/menu/${dish.id}`} >    
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay> 
                </Link>       
            </Card>
        );

    }  

    const Menu = (props) => {
        const menu = props.dishes.map((dish) => {            //iterate in all the dishes //this is removed because props is comming as parameter
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish}/>
                </div>
            );
        });

        return (
            <div className="container">
                <div class Nema="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

export default Menu;