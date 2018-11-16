import expensesReducer from '../../reducers/recipes'
import recipes from '../fixtures/recipes';

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should add recipes', () => {
    const state = expensesReducer(undefined, {type: 'ADD_RECIPES', recipes});
    expect(state).toEqual(recipes);
});