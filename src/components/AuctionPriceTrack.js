import React, { useState, useEffect } from 'react';
import ReactSwipe from 'react-swipe';
import { Tabs, Steps } from 'antd';
import { connect } from 'react-redux';

import RealmSelection from './RealmSelection';
import MainList from './MainList';
import Stats from './Stats';

// TODO Ajouter la selection de language au store puis corrigé celle en place et ajouter a display table

const { TabPane } = Tabs;
const { Step } = Steps;

const AuctionPriceTrack = (props) => {

  const [realm, setRealm] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRealmPicked = (e) => {
    console.log(e, 'e');
    setRealm(e);
    console.log(realm, 'realm');
    setActiveTab('2');
  };

  useEffect(() => {
    console.log(props.selectedRecipe, 'props.selectedRecipe');
    setSelectedRecipe(props.selectedRecipe);
    if (selectedRecipe) {
      console.log(realm);
      setActiveTab('3');
    }
    console.log(selectedRecipe, 'selectedRecipe');
  }, [props.selectedRecipe]);


  return (
    <div className="main">

      <Tabs defaultActiveKey="1" activeKey={activeTab}>
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

const mapStatetoProps = state => ({
  selectedRecipe: state.recipes.selectedRecipe,
});

// More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(AuctionPriceTrack);
