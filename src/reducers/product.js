//Product Reducer
const productReducerDefaultState = [];

export default (state = productReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const idExists = state.find((item) => item.id === action.product.id)
            if (!idExists) {
                return [...state, action.product]
            }
            return state;
        case 'EDIT_QUANTITY_PRODUCT':
            console.log(action);
            console.log('state', state);
            return state.map((product) => {
                if (product.id === action.id) {
                    return {
                        ...product,
                        ...{quantity:action.quantity}
                    }
                } else {
                    console.log('ko');
                    return product;
                }
            })
        case 'REMOVE_PRODUCT':
            return state.filter(({ id }) => action.id !== id); //({id}) destructuring because state is an array of objects and we only need their id
        //filter return the array with all the product that does not match the array
        default:
            return state;
    }
}

