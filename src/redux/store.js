import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState } from './initialState';
import { reducer as drinksReducer } from './drinksRedux';
import { reducer as ordersReducer } from './ordersRedux';
import { reducer as productsReducer } from './productsRedux';
import { reducer as userReducer } from './userRedux';
import { reducer as tagsReducer } from './tagsRedux';

// define reducers
const reducers = {
  drinks: drinksReducer,
  orders: ordersReducer,
  products: productsReducer,
  user: userReducer,
  tags: tagsReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
