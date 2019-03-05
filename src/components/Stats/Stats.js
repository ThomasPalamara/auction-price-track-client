/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Icon } from 'antd';
import GraphsItems from './GraphsItems';
import GraphsRecipe from './GraphsRecipe';
import { apiURL, recipePropTypes } from '../../constants';

const { TabPane } = Tabs;

class Stats extends React.Component {
  state = {
    itemsStats: null,
    loading: false,
  }

  componentDidUpdate(prevProps) {
    const { recipe, realm } = this.props;
    console.log(recipe);
    if ((realm.value && recipe._id)
      && (prevProps.realm.value !== realm.value || prevProps.recipe._id !== recipe._id)) {
      const fetches = [];
      console.log('%c Fetching', 'background: #222; color: #bada55');
      this.setState({ loading: true, itemsStats: null }, () => {
        recipe.reagents.map(reagent => fetches.push(this.fetchItemStats(reagent.blizzardId)));
        fetches.push(this.fetchItemStats(recipe.craft.blizzardId));

        Promise.all(fetches).then((responses) => {
          const itemsStats = {};
          console.log('reponses', responses);
          responses.forEach((response) => {
            itemsStats[response[0].itemId] = response;
          });

          Object.keys(itemsStats).forEach((item) => {
            itemsStats[item].forEach((element, i, array) => {
              // console.log(element.timestamp);
              // console.log(new Date(element.timestamp).getTime());
              array[i].timestamp = new Date(element.timestamp).getTime();
            });
          });
          console.log('itemsStats', itemsStats);
          this.setState({ itemsStats });
          console.log('%c End Fetching', 'background: #222; color: #bada55');
          this.setState({ loading: false });
        });
      });
    }
  }

  fetchItemStats(itemId) {
    const { realm } = this.props;
    return fetch(`${apiURL}/itemstats/${realm.value}/${itemId}`)
      // eslint-disable-next-line max-len
      // return fetch(`${apiURL}/itemstats/${realm.value}/${itemId}?start=2019-02-01T23:52:50.000Z&end=2019-02-04T07:52:50.000Z`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not found');
        }
        return res.json();
      });
  }

  render() {
    const { recipe, realm } = this.props;
    const { loading, itemsStats } = this.state;
    let display;
    if (realm && recipe.type) {
      display = (
        <Tabs defaultActiveKey="1">
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
  }
}

Stats.propTypes = {
  realm: PropTypes.objectOf(PropTypes.string),
  recipe: recipePropTypes.isRequired,
};

Stats.defaultProps = { realm: undefined };

const mapStatetoProps = state => ({ recipe: state.recipes.selectedRecipe });

export default connect(mapStatetoProps)(Stats);
