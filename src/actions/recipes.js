export const selectRecipe = (recipe = {}) => (
  {
    type: 'SELECT_RECIPE',
    recipe,
  });


const defaultRecipes = [{
  professions: [''],
  type: '',
  craft: {
    blizzardId: 0,
    quantity: 1,
  },
  reagents: [{
    blizzardId: 0,
    quantity: 0,
  }, {
    blizzardId: 1,
    quantity: 0,
  }],
}];

export const addRecipes = (recipes = defaultRecipes) => (
  {
    type: 'ADD_RECIPES',
    recipes,
  }
);
