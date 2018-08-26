import { createStore, combineReducers } from "redux";
import filtersReducer from '../reducers/filters';
import productReducer from '../reducers/product';
import ingredientReducer from '../reducers/ingredient';

//Store creation we put the store creation inside of a function so it can be exported 

export default () => {
    const store = createStore(
        combineReducers({
            product: productReducer,
            ingredient: ingredientReducer,
            filters: filtersReducer
        })
    );
return store;
}