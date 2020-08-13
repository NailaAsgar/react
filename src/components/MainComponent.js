
import React from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponents';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutusComponent';
import Home from './HomeComponent';
import { Switch, Route,Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }   
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}, //adding necessary actions to reset the form.
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () =>dispatch(fetchLeaders()),
  postFeedback: (firstname,lastname,telnum,
    email,message) => dispatch(postFeedback(firstname,lastname,telnum,
      email,message)),
});

class Main extends React.Component{

  constructor(props) { 
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {  //homepage functional component
        return(
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured) [0] } //dishes.dishes is because in dishes.js the state is changed, it contains 3 attributes.
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured) [0] }
            promoLoading={this.props.promotions.isLoading}
            promoErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured) [0] }
            leaderLoading={this.props.leaders.isLoading}
            leaderErrMess={this.props.leaders.errMess}
               />
        );
    }

    const DishWithId =({match}) => {  //extracting match parameter.
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}  
        isLoading={this.props.dishes.isLoading}
        ErrMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
        />
      );
    }

    return (
    <div>
      <Header />
      <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />  
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} 
                                                                    postFeedback={this.props.postFeedback}/>} />
              <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />}/>
              <Route path="/menu/:dishId" component={DishWithId} /> 
              <Redirect to='/home'/>
            </Switch> 
          </CSSTransition>
      </TransitionGroup>
       <Footer/> 
    </div>
  );
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));  //connecting component to react router.
