
import React from "react";
import { connect } from 'react-redux';
import { Row, Col } from "antd";

class Stats extends React.Component {
    render() {
        console.log(this.props.selectedStats);
        return (
            <div>
                { this.props.selectedStats.includes('recipe') && <h1>Recipe Stats</h1> }
                { this.props.selectedStats.includes(this.props.recipe.craft.blizzardId) && <h1>Craft Stats</h1> }
                { this.props.recipe.reagents.map((reagent) => (
                    this.props.selectedStats.includes(reagent.blizzardId) && <h1>{reagent.name} Stats</h1>
                ))}
            </div>
        );
    }
}


export default Stats;