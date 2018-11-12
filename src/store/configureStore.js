import { createStore, combineReducers } from "redux";
import filtersReducer from '../reducers/filters';
import itemLanguageReducer from '../reducers/itemLanguage';
import recipesReducer from '../reducers/recipes';

//Store creation we put the store creation inside of a function so it can be exported 

export default () => {
    const initialState = {
        recipes: [{
            "professions": [""],
            "type": "",
            "craft": {
                "blizzardId": 0,
                "quantity": 1
            },
            "reagents": [{
                "blizzardId": 0,
                "quantity": 0
            }, {
                "blizzardId": 1,
                "quantity": 0
            }]
        }],
        itemLanguage: 'en'
    }
    const store = createStore(
        combineReducers({
            recipes: recipesReducer,
            filters: filtersReducer,
            itemLanguage: itemLanguageReducer
        }),
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}