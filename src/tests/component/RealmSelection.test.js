import React from 'react';
import { shallow } from "enzyme";
import toJSON from 'enzyme-to-json';
import RealmSelection from '../../components/RealmSelection';
import realms from '../fixtures/realms'

test('Should render RealmSelection component correctly', () => {
    const wrapper = shallow(<RealmSelection />);
    wrapper.setState({ response: realms })
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('Should render error correctly for empty input', () => {
    const wrapper = shallow(<RealmSelection />);
    wrapper.setState({ response: realms })

    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBeTruthy()
    expect(wrapper.find('label.error').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('Should render error correctly for invalid input', () => {
    const wrapper = shallow(<RealmSelection handleRealmPicked={() => {}}/>);
    wrapper.setState({ response: realms });

    const select = wrapper.find('StateManager').at(0).simulate('change', {
        "label": "Ysondres",
        "value": "ysondres",
      });
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBeTruthy();
    expect(wrapper.find('label.error').length).toBe(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('Should set selected realm correctly', () => {
    const wrapper = shallow(<RealmSelection handleRealmPicked={() => {}}/>);
    wrapper.setState({ response: realms });
    const selectedOption = {
        "label": "Ysondres",
        "value": "ysondres",
      }

    const select = wrapper.find('StateManager').at(0).simulate('change', selectedOption);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('selectedOption')).toEqual(selectedOption);
});

// test('Should handle realm selection ', () => {
//     const wrapper = shallow(<RealmSelection />);
//     const select = wrapper.find('StateManager').at(0);
//     select.value = 'Ysondres'
//     wrapper.find('form').simulate('submit', {
//         preventDefault: () => { }
//     });
// })