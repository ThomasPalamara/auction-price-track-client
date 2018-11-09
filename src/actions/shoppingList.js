export const setShoppingList = (shoppingList = {}) => (
    {
    type: 'SET_SHOPPING_LIST',
    shoppingList
});

export const addRecipe = (recipe = {}) => (
    {
        type: 'ADD_RECIPE',
        recipe
    }
)