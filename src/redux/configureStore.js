import {createStore, combineReducers} from 'redux';
import{ Dishes } from './dishes';
import{ Comments } from './comments';
import{ Leaders } from './leaders';
import{ Promotions } from './promotions';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions
        })
    );

    return store;
}