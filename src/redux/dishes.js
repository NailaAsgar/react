import { DISHES } from '../shared/dishes';

export  const Dishes = (state= DISHES, action) => {  //takes state and actions as 2 parameters
    switch(action.type) {
        default:
            return state;
    }
}