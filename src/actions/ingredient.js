//Action generators cf redux 101
export const addIngredient = ({ id = 0, name={}, quantity=1 } = {}) => (
    {
    type: 'ADD_INGREDIENT',
    ingredient: {
        id,
        name,
        quantity
    }
})
export const removeIngredient = ({ id } = {}) => (
    {
    type: 'REMOVE_INGREDIENT',
    id
})

export const editQuantityIngredient = ({ id, quantity } = {}) => (
    {
    type: 'EDIT_QUANTITY_INGREDIENT',
    id,
    quantity
})