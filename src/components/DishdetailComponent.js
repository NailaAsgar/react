import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText, BreadcrumbItem, Breadcrumb, Label, Button,
   Row, Col, ModalBody, ModalHeader, Modal} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from "react-router-dom"
import { render } from '@testing-library/react';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';


const required = (val) => (val) && (val.length);
const maxLength = (len) => (val) => !(val) || (val.length <=len);
const minLength = (len) => (val) => (val) && (val.length >=len);



export class CommentForm extends React.Component{

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isModalOpen: false
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen               //negating the value of isModalOpen, if its true it will be turned to false and vice versa
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }


    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-write fa-lg">Submit Comment</span></Button>
                 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label> 
                                <Col>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Your Name</Label> 
                                <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators ={{
                                            required, 
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors 
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: "Required",
                                                minLength: "Must be greater than 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}
                                        />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Comment</Label> 
                                <Col md={10}>
                                <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

    function RenderDish({dish}){        //userdefined components start with capital letter
            return(

                <Card className="col-12 col-md-5 m-1">
                    <CardImg width='100%' src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
    }


    function RenderComments({comments, addComment, dishId}) {
        if (comments != null)
                return (
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul clasName="list-unstyled">
                            {comments.map((comment) => {
                                return (
                                    <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author},
                                            &nbsp;
                                            {new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit'
                                            }).format(new Date(comment.date))}
                                        </p>
                                    </li>
                                );
                            })}
                            
                        </ul> 
                       <CommentForm dishId={dishId} addComment={addComment}/> 
                    </div>
                );
        else{
            return (
                <div></div>
            )
        }

    }



    const DishDetail = (props) => {
        if(props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>  
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>  
            </div>  
            );
        }
        else if (props.dish != null)
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
                            <RenderDish dish={props.dish}/> 
                            <RenderComments comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id}/>
                            
                        </div>
                </div>
            );
        
    }

export default DishDetail; 



