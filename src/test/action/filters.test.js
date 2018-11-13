import { setisCustomFilter, setProfessionFilter } from "../../actions/filters";

test('should setup isCustom filter', () => {
    const action = setisCustomFilter(true);
    expect(action).toEqual({
        type: 'SET_IS_CUSTOM_FILTER',
        isCustom: true
    })
});

test('should setup profession filter', () => {
    const action = setProfessionFilter('enchant');
    expect(action).toEqual({
        type: 'SET_PROFESSION_FILTER',
        profession: 'enchant'
    })
});