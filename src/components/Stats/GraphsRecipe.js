import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Spin, Icon, Checkbox } from 'antd';
import WHLink from '../WHLink';
import ZoomGraph from './ZoomGraph';
import EmptyChart from './EmptyChart';
import { recipePropTypes } from '../../constants';

const loadIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const statsToSum = ['itemCount', 'itemId', 'max', 'mean', 'median', 'min', 'mode', 'percentile25', 'percentile5', 'percentile7', 'percentile95'];

class GraphsRecipe extends React.Component {
  state = { item: [] }

  componentDidMount() {
    const { recipe } = this.props;
    this.setState({ item: [recipe.craft.blizzardId] });
  }

  componentDidUpdate(prevProps) {
    const { recipe } = this.props;
    if (recipe.craft.blizzardId !== prevProps.recipe.craft.blizzardId) {
      this.setState({ item: [recipe.craft.blizzardId] });
    }
  }

  checkHandler = (checkedList) => {
    // console.log(checkedList);
    this.setState({ item: [...checkedList] });
  }

  addRecipeData = (items, data, dataToSum) => (
    data[items[0]].map((ref) => {
      const returnedObj = { ...ref };
      returnedObj.itemId = 'recipe';
      for (let i = 1; i < items.length; i += 1) {
        const dataWithSameTimestamp = data[items[i]].find(x => x.timestamp === ref.timestamp);
        Object.keys(dataWithSameTimestamp).forEach((key) => {
          if (dataToSum.find(x => x === key)) {
            returnedObj[key] += dataWithSameTimestamp[key];
          }
        });
      }
      return returnedObj;
    })
  )

  render() {
    const { loading, recipe, itemsStats } = this.props;
    const { item } = this.state;
    let graphs;
    console.log(item);
    if (!loading && itemsStats && item.length) {
      graphs = (
        <React.Fragment>
          <ZoomGraph stats={['mean']} item={item} itemStats={itemsStats[item]} />
        </React.Fragment>
      );
    } else {
      graphs = <EmptyChart />;
    }
    return (
      <Row>
        <Col span={6}>
          <Checkbox.Group style={{ width: '100%' }} value={item} onChange={this.checkHandler}>
            {
              recipe.craft
              && (
                <ul className="craft">
                  <li>Craft: </li>
                  <li>
                    <Checkbox defaultChecked value={recipe.craft.blizzardId}>
                      <WHLink {...recipe.craft} />
                    </Checkbox>
                  </li>
                </ul>
              )}
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
  loading: PropTypes.string,
  recipe: recipePropTypes.isRequired,
  itemsStats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GraphsRecipe.defaultProps = { loading: false };

export default GraphsRecipe;
