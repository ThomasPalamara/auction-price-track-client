import React from 'react';
import { shallow } from "enzyme";
import toJSON from 'enzyme-to-json';
import AuctionPriceTrack from '../../components/AuctionPriceTrack';

test('Should render AuctionPriceTrack component correctly', () => {
    const wrapper = shallow(<AuctionPriceTrack/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h3').length).toBe(1);
})

test('Should render DisplayStats component correctly when server set', () => {
    const wrapper = shallow(<AuctionPriceTrack/>);
    wrapper.setState({auctionHouse: {data:'some data'}})
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('DisplayStats').length).toBe(1);
})