import React from "react";
import { Radio, Col, Row, Spin, Icon, Checkbox } from "antd";
import WHLink from "../WHLink";
import ZoomGraph from "./ZoomGraph";
import EmptyChart from "./EmptyChart";

const loadIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const statsToSum = ['itemCount','itemId','max','mean','median','min','mode','percentile25','percentile5','percentile7','percentile95'];

class GraphsRecipe extends React.Component {
    state = {
        item: []
    }

    checkHandler = (checkedList) => {
        // console.log(checkedList);
        this.setState({ item: [...checkedList] });
    }

    componentDidMount() {
        this.setState({ item: [this.props.recipe.craft.blizzardId] })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.recipe.craft.blizzardId !== prevProps.recipe.craft.blizzardId) {
            this.setState({ item: [this.props.recipe.craft.blizzardId] })
        }
    }

    addRecipeData(items, data, dataToSum) {
        return data[items[0]].map(ref => {
            var returnedObj = { ...ref };
            returnedObj.itemId = 'recipe';
            for (let i = 1; i < items.length; i++) {
                const dataWithSameTimestamp = data[items[i]].find(x => x.timestamp === ref.timestamp);
                for (var propName in dataWithSameTimestamp) {
                    if (dataToAdd.find(x => x === propName)) {
                        returnedObj[propName] += dataWithSameTimestamp[propName];
                    }
                }
            }
            return returnedObj;
        })
    }

    render() {
        let { loading, recipe, itemsStats } = this.props;
        let { item } = this.state;
        let graphs;
        console.log(item);
        if (!loading && itemsStats && item.length) {
            graphs = (
                <React.Fragment>
                    <ZoomGraph stats={['mean']} item={item} itemStats={itemsStats[item]} />
                </React.Fragment>
            );
        } else {
            graphs = <EmptyChart />
        }
        return (
            <Row>
                <Col span={6}>
                    <Checkbox.Group style={{ width: '100%' }} value={item} onChange={this.checkHandler}>
                        {
                            recipe.craft &&
                            <ul className="craft">
                                <li>Craft: </li>
                                <li>
                                    <Checkbox defaultChecked={true} value={recipe.craft.blizzardId}><WHLink {...recipe.craft} /></Checkbox>
                                </li>
                            </ul>
                        }
                        <ul className="reagent">
                            <li>Reagents: </li>
                            {recipe.reagents.map((reagent, i) => (
                                <li key={i}><Checkbox key={i} value={reagent.blizzardId}><WHLink {...reagent} /></Checkbox></li>
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

export default GraphsRecipe;



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