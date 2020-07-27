import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText, BreadcrumbItem, Breadcrumb} from 'reactstrap';
import {Link} from "react-router-dom"


    function RenderDish({dish}){        //userdefined components start with capital letter
        if(dish != null){
            return(

                <Card className="col-12 col-md-5 m-1">
                    <CardImg width='100%' src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }


    function RenderComments({comments}) {
        if (comments != null) {
            const cmnts = this.props.dishes.comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author},
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(new Date(comment.date))}
                        </p>
                    </div>
                )
            });

            return (
                <div>
                    <h4> Comments </h4>
                    <ul className='list-unstyled'>
                        {cmnts}
                    </ul>

                </div>
            )
        }
        else{
            return (
                <div></div>
            )
        }

    }
    const DishDetail = (props) => {

       return(
           <div className="container">
               <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
               <div className="row">
                    <RenderDish dish={props.dishes}/> 
                    <RenderComments comments={props.dishes}/>
                </div>
           </div>


       )

    }

export default DishDetail;

