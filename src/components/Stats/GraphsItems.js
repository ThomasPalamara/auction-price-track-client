import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Col, Row, Spin, Icon } from 'antd';
import WHLink from '../WHLink';
import ZoomGraph from './ZoomGraph';
import EmptyChart from './EmptyChart';
import { recipePropTypes } from '../../constants';

const loadIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class GraphsItems extends React.Component {
  state = { item: '' }

  componentDidMount() {
    const { recipe } = this.props;
    this.setState({ item: recipe.craft.blizzardId });
  }

  componentDidUpdate(prevProps) {
    const { recipe } = this.props;
    if (recipe.craft.blizzardId !== prevProps.recipe.craft.blizzardId) {
      this.setState({ item: recipe.craft.blizzardId });
    }
  }

  radioHandler = (e) => {
    this.setState({ item: e.target.value });
  }


  render() {
    const { loading, recipe, itemsStats } = this.props;
    const { item } = this.state;
    let graphs;
    if (!loading && itemsStats) {
      graphs = (
        <React.Fragment>
          <ZoomGraph stats={['percentile5']} item={item} itemStats={itemsStats[item]} />
          <ZoomGraph stats={['percentile25']} item={item} itemStats={itemsStats[item]} />
          <ZoomGraph stats={['mean']} item={item} itemStats={itemsStats[item]} />
          <ZoomGraph stats={['median']} item={item} itemStats={itemsStats[item]} />
          <ZoomGraph stats={['mode']} item={item} itemStats={itemsStats[item]} />
        </React.Fragment>
      );
    } else {
      graphs = <EmptyChart />;
    }
    return (
      <Row>
        <Col span={6}>
          <Radio.Group style={{ width: '100%' }} value={item} onChange={this.radioHandler}>
            {
              recipe.craft
              && (
                <ul className="craft">
                  <li>Craft: </li>
                  <li>
                    <Radio defaultChecked value={recipe.craft.blizzardId}>
                      <WHLink {...recipe.craft} />
                    </Radio>
                  </li>
                </ul>
              )}
            <ul className="reagent">
              <li>Reagents: </li>
              {recipe.reagents.map(reagent => (
                <li key={reagent.blizzardId}>
                  <Radio value={reagent.blizzardId}>
                    <WHLink {...reagent} />
                  </Radio>
                </li>
              ))}
            </ul>
          </Radio.Group>
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

GraphsItems.propTypes = {
  loading: PropTypes.string,
  recipe: recipePropTypes.isRequired,
  itemsStats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GraphsItems.defaultProps = { loading: false };

export default GraphsItems;
