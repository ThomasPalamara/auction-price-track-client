import React, { useState } from 'react';
import ReactSwipe from 'react-swipe';

import RealmSelection from './RealmSelection';
import MainList from './MainList';
import Stats from './Stats';

// TODO Ajouter la selection de language au store puis corrigé celle en place et ajouter a display table

const AuctionPriceTrack = () => {
  // State par default pour faciliter les tests
  let reactSwipeEl;

  const [realm, setRealm] = useState({
    label: '',
    value: '',
  });

  const handleRealmPicked = (e) => {
    console.log(e, 'realm');
    setRealm(realm);
  };

  return (
    <div className="main">

      <button type="button" onClick={() => reactSwipeEl.prev()}>Previous</button>
      <button type="button" onClick={() => reactSwipeEl.next()}>Next</button>

      <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} ref={(el) => { reactSwipeEl = el; }}>
        <RealmSelection handleRealmPicked={handleRealmPicked} />
        <MainList />
        <Stats realm={realm} />
      </ReactSwipe>

    </div>
  );
}

export default AuctionPriceTrack;
