import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer( undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        profession: 'all',
        isCustom: false
    });
});

test('should set isCustom to true', () => {
    const state = filtersReducer( undefined , {type: 'SET_IS_CUSTOM_FILTER', isCustom: true});
    expect(state.isCustom).toBe(true);
});

test('should set profession filter', () => {
    const profession = 'enchant'
    const state = filtersReducer( undefined, {type: 'SET_PROFESSION_FILTER', profession});
    expect(state.profession).toEqual('enchant');
});