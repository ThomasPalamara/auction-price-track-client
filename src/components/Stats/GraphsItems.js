import React from 'react';
import { Radio, Col, Row, Spin, Icon } from 'antd';
import WHLink from '../WHLink';
import ZoomGraph from './ZoomGraph';
import EmptyChart from './EmptyChart';

const loadIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class GraphsItems extends React.Component {
    state = {
        item: ''
    }

    radioHandler = (e) => {
        this.setState({ item: e.target.value });
    }

    componentDidMount() {
        this.setState({ item: this.props.recipe.craft.blizzardId })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.recipe.craft.blizzardId !== prevProps.recipe.craft.blizzardId) {
            this.setState({ item: this.props.recipe.craft.blizzardId })
        }
    }
    render() {
        let { loading, recipe, itemsStats } = this.props;
        let { item } = this.state;
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
            graphs = <EmptyChart />
        }
        return (
            <Row>
                <Col span={6}>
                    <Radio.Group style={{ width: '100%' }} value={item} onChange={this.radioHandler}>
                        {
                            recipe.craft &&
                            <ul className="craft">
                                <li>Craft: </li>
                                <li>
                                    <Radio defaultChecked={true} value={recipe.craft.blizzardId}><WHLink {...recipe.craft} /></Radio>
                                </li>
                            </ul>
                        }
                        <ul className="reagent">
                            <li>Reagents: </li>
                            {recipe.reagents.map((reagent, i) => (
                                <li key={i}><Radio key={i} value={reagent.blizzardId}><WHLink {...reagent} /></Radio></li>
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

export default GraphsItems;



// <Row>
//                     <Col span={6}>
//                         <Recipe handler={this.handleSelectedStats} recipe={this.props.selectedRecipe} />
//                     </Col>
//                     {!this.state.loading && this.state.stats &&
//                         <Col span={18}>
//                             <Graphs selectedStats={this.state.selectedStats} stats={this.state.stats} recipe={this.props.selectedRecipe} />
//                         </Col>
//                     }
//                 </Row>
