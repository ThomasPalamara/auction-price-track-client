import { createStore, combineReducers } from "redux";
import filtersReducer from '../reducers/filters';
import itemLanguageReducer from '../reducers/itemLanguage';
import shoppingListReducer from '../reducers/shoppingList';

//Store creation we put the store creation inside of a function so it can be exported 

export default () => {
    const initialState = {
        shoppingList: {
            "profession": "",
            "type": "",
            "craft": {
                "id": 0,
                "Quantity": 0
            },
            "reagents": [{
                "id": 0,
                "Quantity": 0
            }, {
                "id": 0,
                "Quantity": 0
            }]
        },
        itemLanguage: 'en'
    }
    const store = createStore(
        combineReducers({
            shoppingList: shoppingListReducer,
            filters: filtersReducer,
            itemLanguage: itemLanguageReducer
        }),
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}