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
  state = {
    items: [],
    isCraftChecked: true,
  }

  componentDidMount() {
    const { recipe } = this.props;
    this.setState({ items: [recipe.craft.blizzardId] });
  }

  componentDidUpdate(prevProps) {
    const { recipe } = this.props;
    if (recipe.craft.blizzardId !== prevProps.recipe.craft.blizzardId) {
      this.setState({ items: [recipe.craft.blizzardId] });
    }
  }

  checkHandler = (checkedList) => {
    // console.log(checkedList);
    this.setState({ items: [...checkedList] });
  }

  addRecipeData = (items, data, statsToSum) => (
    data[items[0]].map((ref) => {
      const returnedObj = { ...ref };
      returnedObj.itemId = 'recipe';
      for (let i = 1; i < items.length; i += 1) {
        const dataWithSameTimestamp = data[items[i]].find(x => x.timestamp === ref.timestamp);
        Object.keys(dataWithSameTimestamp).forEach((key) => {
          if (statsToSum.find(x => x === key)) {
            returnedObj[key] += dataWithSameTimestamp[key];
          }
        });
      }
      return returnedObj;
    })
  )

  render() {
    const { loading, recipe, itemsStats } = this.props;
    const { items, isCraftChecked } = this.state;
    let graphs;
    console.log(items);
    if (!loading && itemsStats && items.length) {
      graphs = (
        <React.Fragment>
          <ZoomGraph stats={['mean']} item={items} itemStats={itemsStats[items]} />
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
                  <Checkbox defaultChecked value={recipe.craft.blizzardId}>
                    <WHLink {...recipe.craft} />
                  </Checkbox>
                </li>
              </ul>
            )}
          <Checkbox.Group style={{ width: '100%' }} value={item} onChange={this.checkHandler}>
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
