import React from 'react';
import { render } from "@testing-library/react";
import {Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText} from 'reactstrap';



class Dishdetail extends React.Component {


    renderDish(dish){
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


    renderComments(comments) {
        if (comments != null) {
            const cmnts = this.props.dish.comments.map((comment) => {
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
    render() {

       return(
           <div className="container">
               <div className="row">
                        {this.renderDish(this.props.dish)} 
                 
                    <div className ="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
           </div>


       )

    }
}

export default Dishdetail;

