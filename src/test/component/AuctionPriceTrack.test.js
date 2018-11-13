import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AuctionPriceTrack from '../../components/AuctionPriceTrack';

test('Should render AuctionPriceTrack component correctly', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<AuctionPriceTrack />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})