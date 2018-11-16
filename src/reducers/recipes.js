
export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_RECIPES':
            return action.recipes;
        case 'SELECT_RECIPE':
            return {...state, selectedRecipe: action.recipe};
        default:
            return state;
    }
}

