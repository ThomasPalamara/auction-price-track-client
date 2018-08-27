//Action generators cf redux 101
export const addProduct = ({ id = 0, name={}, quantity=1 } = {}) => ({
    type: 'ADD_PRODUCT',
    product: {
        id,
        name,
        quantity
    }
})
export const removeProduct = ({ id } = {}) => (
    {
    type: 'REMOVE_PRODUCT',
    id
})

export const editQuantityProduct = ({ id, quantity } = {}) => (
    {
    type: 'EDIT_QUANTITY_PRODUCT',
    id,
    quantity
})