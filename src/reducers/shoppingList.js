const defaultShoppingListState = {
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
}
export default (state = defaultShoppingListState, action) => {
    console.log(state);
    switch (action.type) {
        case 'ADD_RECIPE':
            return {...state, ...action.recipe};
        default:
            return state;
    }
}

