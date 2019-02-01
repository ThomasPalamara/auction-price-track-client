import React from "react";
import { Radio, Col, Row } from "antd";
import LineGraph from "./LineGraph";
import WHLink from "../WHLink";
import ZoomGraph from "./zoomGraph";
import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import EmptyChart from "./EmptyChart";


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
            console.log('YAS');
            this.setState({ item: this.props.recipe.craft.blizzardId })
        }
    }
    render() {
        let { loading, recipe, itemsStats } = this.props;
        console.log(loading, itemsStats);
        let graphs;
        if (!loading && itemsStats) {
            graphs = <ZoomGraph stats={['percentile5']} item={this.state.item} itemStats={itemsStats[this.state.item]} />
        } else {
            graphs = <EmptyChart/>
        }
        return (
            <Row>
                <Col span={6}>
                    <Radio.Group style={{ width: '100%' }} value={this.state.item} onChange={this.radioHandler}>
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
                    {graphs}
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