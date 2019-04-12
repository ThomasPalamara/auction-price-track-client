import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Spin, Icon, Checkbox } from 'antd';
import WHLink from '../WHLink';
import ZoomGraph from './ZoomGraphRecipe';
import EmptyChart from './ChartsMiscs/EmptyChart';
import { recipePropTypes } from '../../constants';

const loadIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const statsToSum = ['itemCount', 'max', 'mean', 'median', 'min', 'mode', 'percentile25', 'percentile5', 'percentile7', 'percentile95'];

class GraphsRecipe extends React.Component {
  state = {
    reagentItems: [],
    isCraftChecked: true,
  }

  // componentDidMount() {
  //   const { recipe } = this.props;
  //   this.setState({ reagentItems: [recipe.craft.blizzardId] });
  // }

  componentDidUpdate(prevProps) {
    const { itemsStats } = this.props;
    if (itemsStats !== prevProps.itemsStats) {
      console.log('AGFADSFGADFHSADFHSA');}
    // const { recipe } = this.props;
    // if (recipe.craft.blizzardId !== prevProps.recipe.craft.blizzardId) {
    //   this.setState({ reagentItems: [], isCraftChecked: false });
    // }
  }

  checkHandler = (checkedList) => {
    // console.log(checkedList);
    this.setState({ reagentItems: [...checkedList] });
  }

  onChangeCraftCheck = (e) => {
    this.setState({ isCraftChecked: e.target.checked });
  }

  sumRecipeData = (items, data, sumStats) => {
    return data[items[0]].map((ref) => {
      const returnedObj = { ...ref };
      returnedObj.itemId = 'recipe';
      for (let i = 1; i < items.length; i += 1) {
        const dataWithSameTimestamp = data[items[i]].find(x => x.timestamp === ref.timestamp);
        Object.keys(dataWithSameTimestamp).forEach((key) => {
          if (sumStats.find(x => x === key)) {
            returnedObj[key] += dataWithSameTimestamp[key];
          }
        });
      }
      return returnedObj;
    })
  };

  getItemDataForGivenStat = (data, statName, indexName) => {
    return data.map((element) => {
      const obj = {};
      obj.timestamp = element.timestamp;
      obj[indexName] = element[statName];
      return obj;
    })
  };

  getGraphData = (statName) => {
    console.log('%c Fire! ', 'background: #ee5423; color: #ffffff');
    const { reagentItems, isCraftChecked } = this.state;
    const { recipe, itemsStats } = this.props;
    const craftId = recipe.craft.blizzardId;
    let craftGraphData;
    let reagentGraphData;
    if (reagentItems.length) {
      reagentGraphData = this.getItemDataForGivenStat(this.sumRecipeData(reagentItems, itemsStats, statsToSum), statName, 'recipe');
    }
    if (isCraftChecked) {
      craftGraphData = this.getItemDataForGivenStat(itemsStats[craftId], statName, 'craft');
    }
    if (isCraftChecked && !reagentItems.length) return craftGraphData;
    if (!isCraftChecked && reagentItems.length) return reagentGraphData;
    if (isCraftChecked && reagentItems.length) {
      const datae = reagentGraphData.map((e) => {
        const dataWithSameTimestamp = craftGraphData.find(x => x.timestamp === e.timestamp);
        e.craft = dataWithSameTimestamp.craft;
        return e;
      });
      return datae;
    }
  }

  render() {
    const { loading, recipe, itemsStats } = this.props;
    const { reagentItems, isCraftChecked } = this.state;
    let graphs;
    console.log(isCraftChecked, reagentItems);
    console.log(loading, 'loading');
    if (!loading && itemsStats && (reagentItems.length || isCraftChecked)) {
      graphs = (
        <React.Fragment>
          <ZoomGraph stats={['mean']} item={reagentItems} data={this.getGraphData('mean')} />
        </React.Fragment>
      );
    } else {
      graphs = <EmptyChart />;
    }
    return (
      <Row>
        <Col span={6}>
          {
            recipe.craft
            && (
              <ul className="craft">
                <li>Craft: </li>
                <li>
                  <Checkbox checked={isCraftChecked} onChange={this.onChangeCraftCheck}>
                    <WHLink {...recipe.craft} />
                  </Checkbox>
                </li>
              </ul>
            )}
          <Checkbox.Group style={{ width: '100%' }} value={reagentItems} onChange={this.checkHandler}>
            <ul className="reagent">
              <li>Reagents: </li>
              {recipe.reagents.map(reagent => (
                <li key={reagent.blizzardId}>
                  <Checkbox value={reagent.blizzardId}>
                    <WHLink {...reagent} />
                  </Checkbox>
                </li>
              ))}
            </ul>
          </Checkbox.Group>
        </Col>
        <Col span={18}>
          <Spin spinning={loading} tip="Fetching..." indicator={loadIcon}>
            {graphs}
          </Spin>
        </Col>
      </Row>
    );
  }
}

GraphsRecipe.propTypes = {
  loading: PropTypes.bool,
  recipe: recipePropTypes.isRequired,
  itemsStats: PropTypes.objectOf(PropTypes.array),
};

GraphsRecipe.defaultProps = {
  loading: false,
  itemsStats: null,
};


export default GraphsRecipe;
