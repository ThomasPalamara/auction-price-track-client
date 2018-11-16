import React from 'react';
import { shallow } from "enzyme";
import toJSON from 'enzyme-to-json';
import { MainListFilter } from '../../components/MainListFilter';

test('Should render MainListFilter component correctly', () => {
    const filters = {
        text: '',
        profession: 'all',
        isCustom: false
    }
    const professions = ['enchant','alchemy']
    const wrapper = shallow(<MainListFilter professions={professions} filters={filters} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
})

// test('Should handle isCustom filter change correctly', () => {
//     const filters = {
//         text: '',
//         profession: 'all',
//         isCustom: false
//     }
//     const professions = ['enchant','alchemy']
//     const wrapper = shallow(<MainListFilter professions={professions} filters={filters} />);
//     wrapper.find('RadioGroup').simulate('change');
// })