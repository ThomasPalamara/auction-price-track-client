import React from 'react';
import { Provider } from 'react-redux';
import AuctionPriceTrack from './components/AuctionPriceTrack';
import configureStore from './store/configureStore';

// import logo from './logo.svg';

const store = configureStore();

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
