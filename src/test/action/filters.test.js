import { setTextFilter } from "../../actions/filters";

test('should setup text filter', () => {
    const action = setTextFilter('test');
    expect(action).toEqual({type: 'SET_ITEM_TEXT_FILTER',text: 'test'});
});