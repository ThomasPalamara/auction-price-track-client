
export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_RECIPES':
            return action.recipes;
        default:
            return state;
    }
}

