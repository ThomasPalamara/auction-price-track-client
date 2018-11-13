import selectRecipes from '../../selectors/recipes';
import recipes from '../fixtures/recipes';


test('should filter by profession', () => {
    const filters = {
        text: '',
        profession: 'alchemy',
        isCustom: false,
    }
    const result = selectRecipes(recipes, filters);

    expect(result).toEqual([recipes[1]]);
});

test('should select ALL profession', () => {
    const filters = {
        text: '',
        profession: 'all',
        isCustom: false,
    }
    const result = selectRecipes(recipes, filters);

    expect(result).toEqual([recipes[1],recipes[2]]);
});

test('should select custom recipes', () => {
    const filters = {
        text: '',
        profession: 'all',
        isCustom: true,
    }
    const result = selectRecipes(recipes, filters);

    expect(result).toEqual([recipes[0]]);
});