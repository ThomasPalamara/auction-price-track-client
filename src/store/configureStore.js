import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filters';
import itemLanguageReducer from '../reducers/itemLanguage';
import recipesReducer from '../reducers/recipes';

// Store creation.
// We put the store creation inside of a function so it can be exported 

export default () => {
  const initialState = {
    recipes: {

      // Old Value

      // selectedRecipe: {
      //   professions: [''],
      //   type: '',
      //   craft: {
      //     blizzardId: 0,
      //     quantity: 1,
      //     name: '',
      //   },
      //   reagents: [{
      //     blizzardId: 0,
      //     quantity: 0,
      //     name: '',
      //   }, {
      //     blizzardId: 1,
      //     quantity: 0,
      //     name: '',
      //   }],
      // },
      selectedRecipe: null,

      recipesList: [{
        professions: [''],
        type: '',
        craft: {
          blizzardId: 0,
          quantity: 1,
          name: '',
        },
        reagents: [{
          blizzardId: 0,
          quantity: 0,
          name: '',
        }, {
          blizzardId: 1,
          quantity: 0,
          name: '',
        }],
      }],
    },
    itemLanguage: 'en',
  }
  const store = createStore(
    combineReducers({
      recipes: recipesReducer,
      filters: filtersReducer,
      itemLanguage: itemLanguageReducer,
    }),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
}
