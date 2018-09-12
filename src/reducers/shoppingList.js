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
    switch (action.type) {
        case 'SET_SHOPPING_LIST':
            return action.shoppingList;
        default:
            return state;
    }
}

