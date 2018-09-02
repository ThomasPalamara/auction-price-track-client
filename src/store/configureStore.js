import { createStore, combineReducers } from "redux";
import filtersReducer from '../reducers/filters';
import itemLanguageReducer from '../reducers/itemLanguage';
import productReducer from '../reducers/product';
import ingredientReducer from '../reducers/ingredient';

//Store creation we put the store creation inside of a function so it can be exported 

export default () => {
    const store = createStore(
        combineReducers({
            product: productReducer,
            ingredient: ingredientReducer,
            filters: filtersReducer,
            itemLanguage: itemLanguageReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
return store;
}