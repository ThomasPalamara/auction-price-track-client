import React from "react";
import { connect } from 'react-redux';
import { Row, Col } from "antd";
import Recipe from "./Recipe"
import Stats from "./Stats"

class DisplayStats extends React.Component {
    state = {
        selectedStats: []
    };
    handleSelectedStats = (selectedStats) => {
        this.setState({ selectedStats })
      }

    render() {
        return (
            <Row>
                <Col span={6}>
                    <Recipe handler={this.handleSelectedStats} recipe={this.props.selectedRecipe}/>
                </Col>
                <Col span={18}>
                    <Stats selectedStats={this.state.selectedStats} recipe={this.props.selectedRecipe}/>
                </Col>
            </Row>
        );
    }
}

const mapStatetoProps = state => {
  return {
    selectedRecipe : state.recipes.selectedRecipe
  }
};

export default connect(mapStatetoProps)(DisplayStats);