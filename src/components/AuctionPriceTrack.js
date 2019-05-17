import React, { useState } from 'react';
import ReactSwipe from 'react-swipe';
import { Tabs, Steps } from 'antd';

import RealmSelection from './RealmSelection';
import MainList from './MainList';
import Stats from './Stats';

// TODO Ajouter la selection de language au store puis corrigé celle en place et ajouter a display table

const { TabPane } = Tabs;
const { Step } = Steps;

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

  const renderTabBar = () => (
    
  );

  return (
    <div className="main">

      <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
        <TabPane tab="Tab 1" key="1" style={{ height: 200 }}>
          <RealmSelection handleRealmPicked={handleRealmPicked} />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <MainList />
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <Stats realm={realm} />
        </TabPane>
      </Tabs>

    </div>
  );
}

export default AuctionPriceTrack;
