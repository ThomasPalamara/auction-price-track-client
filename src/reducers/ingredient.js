//ingredient Reducer
const ingredientReducerDefaultState = [];

export default (state = ingredientReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            console.log(action);
            const idExists = state.find((item) => item.id === action.ingredient.id)
            if (!idExists) {
                return [...state, action.ingredient]
            }
            return state; // ...array Spread operator to keep the value and do not erase it
        case 'EDIT_QUANTITY_INGREDIENT':
            console.log(action);
            return state.map((ingredient) => {
                if (ingredient.id === action.id) {
                    return {
                        ...ingredient,
                        ...{quantity:action.quantity}
                    }
                } else {
                    return ingredient;
                }
            })
        case 'REMOVE_INGREDIENT':
            return state.filter(({ id }) => action.id !== id); //({id}) destructuring because state is an array of objects and we only need their id
        //filter return the array with all the ingredient that does not match the array
        default:
            return state;
    }
}

