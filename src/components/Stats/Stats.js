/* eslint-disable react/no-did-update-set-state */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Icon } from 'antd';
import GraphsItems from './GraphsItems';
import GraphsRecipe from './GraphsRecipe';
import { apiURL, recipePropTypes } from '../../constants';

const { TabPane } = Tabs;

const Stats = (props) => {
  const { recipe, realm } = props;

  const [itemsStats, setItemsStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchItemStats = (itemId) => {
    return fetch(`${apiURL}/itemstats/${realm.value}/${itemId}`)
      // eslint-disable-next-line max-len
      // return fetch(`${apiURL}/itemstats/${realm.value}/${itemId}?start=2019-02-01T23:52:50.000Z&end=2019-02-04T07:52:50.000Z`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not found');
        }
        return res.json();
      });
  };

  useEffect(() => {
    if (realm.value && recipe._id) {
      const fetches = [];
      console.log('%c Fetching', 'background: #222; color: #bada55');

      setLoading(true);
      setItemsStats(null);

      recipe.reagents.map(reagent => fetches.push(fetchItemStats(reagent.blizzardId)));
      fetches.push(fetchItemStats(recipe.craft.blizzardId));

      Promise.all(fetches).then((responses) => {
        const formatedData = {};
        responses.forEach((response) => {
          formatedData[response[0].itemId] = response;
        });

        Object.keys(formatedData).forEach((item) => {
          formatedData[item].forEach((element, i, array) => {
            // console.log(element.timestamp);
            // console.log(new Date(element.timestamp).getTime());
            array[i].timestamp = new Date(element.timestamp).getTime();
          });
        });
        setItemsStats(formatedData);
        console.log('%c End Fetching', 'background: #222; color: #bada55');
        setLoading(false);
      });
    }
  }, [realm, recipe]);

  console.log(loading);
  console.log(itemsStats);
  const newDataHasBeenFetched = itemsStats && recipe.craft.blizzardId in itemsStats;
  console.log('newDataHasBeenFetched', newDataHasBeenFetched);
  let display;
  if (realm && recipe.type && !loading && newDataHasBeenFetched) {
    display = (
      <Tabs defaultActiveKey="2">
        <TabPane tab={(<span><Icon type="border" /> Items</span>)} key="1">
          <GraphsItems loading={loading} itemsStats={itemsStats} recipe={recipe} />
        </TabPane>
        <TabPane tab={<span><Icon type="table" />Recipe</span>} key="2">
          <GraphsRecipe loading={loading} itemsStats={itemsStats} recipe={recipe} />
        </TabPane>
      </Tabs>
    );
  } else {
    display = <h3>Please select {!realm && 'a realm'} {(!realm && !recipe.type) && 'and'} {!recipe.type && 'a recipe'}</h3>;
  }

  return (
    display
  );
};

Stats.propTypes = {
  realm: PropTypes.objectOf(PropTypes.string),
  recipe: recipePropTypes.isRequired,
};

Stats.defaultProps = { realm: undefined };

const mapStatetoProps = state => ({ recipe: state.recipes.selectedRecipe });

export default connect(mapStatetoProps)(Stats);
