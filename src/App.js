import React from 'react';
import AuctionPriceTrack from './components/AuctionPriceTrack';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { setTextFilter } from './actions/filters';

// import logo from './logo.svg';

import './css/App.css';
import 'antd/dist/antd.css';

const store = configureStore();

store.dispatch(setTextFilter(''));

const App = (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">ATP</h1>
    </header>
    <Provider store={store}>
      <AuctionPriceTrack />
    </Provider>
  </div>
);

export default App;