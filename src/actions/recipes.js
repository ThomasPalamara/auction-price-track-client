export const setShoppingList = (shoppingList = {}) => (
    {
    type: 'SET_SHOPPING_LIST',
    shoppingList
});


const defaultRecipes = [{
    "professions": [""],
    "type": "",
    "craft": {
        "blizzardId": 0,
        "quantity": 1
    },
    "reagents": [{
        "blizzardId": 0,
        "quantity": 0
    }, {
        "blizzardId": 1,
        "quantity": 0
    }]
}]

export const addRecipes = (recipes = defaultRecipes) => {
    return(
    {
        type: 'ADD_RECIPES',
        recipes
    }
)}