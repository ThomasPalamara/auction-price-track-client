import React from 'react';
import AuctionPriceTrack from './components/AuctionPriceTrack';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { setTextFilter } from "./actions/filters";
import { setItemLanguage } from "./actions/itemLanguage";
import 'antd/dist/antd.css';
// import logo from './logo.svg';

import './css/App.css';

const store = configureStore();

store.dispatch(setTextFilter(''));
store.dispatch(setItemLanguage('en'));

const App = (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Auction Price Tracker</h1>
    </header>
    <Provider store={store}>
      <AuctionPriceTrack />
    </Provider>
  </div>
);

export default App;