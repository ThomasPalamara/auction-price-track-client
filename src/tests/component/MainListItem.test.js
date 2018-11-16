import React from 'react';
import { shallow } from "enzyme";
import toJSON from 'enzyme-to-json';
import MainListItem from '../../components/MainListItem';
import recipes from '../fixtures/recipes';

test('Should render MainListItem component correctly for recipe (isCustom === false)', () => {
    const wrapper = shallow(<MainListItem element={recipes[1]}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h6').length).toBe(1);
})

test('Should render MainListItem component correctly for reagent (isCustom === true)', () => {
    const wrapper = shallow(<MainListItem element={recipes[0]}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h6').length).toBe(0);
})
