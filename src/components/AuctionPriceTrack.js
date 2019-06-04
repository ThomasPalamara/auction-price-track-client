/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';

import RealmSelection from './RealmSelection';
import MainList from './MainList';
import Stats from './Stats';

import { recipePropTypes } from '../constants';

const { TabPane } = Tabs;

// TODO handle going back and forth between tabs (maybe deactivate them while previous step not completed (then should be more explicite that tabs represent steps by adding nubers ?))

const AuctionPriceTrack = (props) => {
  const { selectedRecipe } = props;
  // Selected Realm could be handled by redux store (like selected recipe) but decided to try another way.
  // Might nee to choose between the two ways.
  const [realm, setRealm] = useState(null);
  // Active tab for mobile display
  const [activeTab, setActiveTab] = useState('1');

  const handleRealmPicked = (e) => {
    setRealm(e);
    setActiveTab('2');
  };

  const handleTabClick = (e) => {
    setActiveTab(e);
  };


  useEffect(() => {
    if (selectedRecipe && realm) {
      setActiveTab('3');
    }
  }, [selectedRecipe]);

  // useEffect(() => {
  //   window.addEventListener('click', this.handleResize);
  //   return () => {
  //     window.addEventListener('resize', this.handleResize);
  //   };
  // }, [input])

  return (
    <div className="main">
      <Tabs defaultActiveKey="1" onChange={handleTabClick} activeKey={activeTab}>

        <TabPane
          tab={(
            <span className={`tab__title ${realm ? 'tab__title--done' : ''}`}>
              <i data-num="1" />
              Realm
            </span>
          )}
          key="1"
        >
          <RealmSelection handleRealmPicked={handleRealmPicked} />
        </TabPane>

        <TabPane
          tab={(
            <span className={`tab__title ${realm && selectedRecipe ? 'tab__title--done' : ''}`}>
              <i data-num="2" />
              Recipe
            </span>
          )}
          key="2"
          disabled={!realm}
        >
          <MainList />
        </TabPane>

        <TabPane
          tab={(
            <span className="tab__title">
              <i data-num="3" />
              Stats
            </span>
          )}
          key="3"
          disabled={!realm || !selectedRecipe}
        >
          <Stats realm={realm} />
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStatetoProps = state => ({ selectedRecipe: state.recipes.selectedRecipe });

AuctionPriceTrack.propTypes = { selectedRecipe: recipePropTypes };

// More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(AuctionPriceTrack);
