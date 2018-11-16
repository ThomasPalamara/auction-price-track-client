import React from 'react';
import { shallow } from "enzyme";
import toJSON from 'enzyme-to-json';
import { MainList } from '../../components/MainList';
import recipes from '../fixtures/recipes';

test('Should render MainList component correctly', () => {
    const wrapper = shallow(<MainList/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
})


//Penser a revoir le test avec les data filtrées

test('Should render MainList component correctly with recipes', () => {
    const wrapper = shallow(<MainList recipesList={recipes}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('MainListItem').length).toBe(3);
})