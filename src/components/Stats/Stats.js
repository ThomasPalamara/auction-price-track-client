import React from "react";
import { connect } from 'react-redux';
import { Row, Col } from "antd";
import Recipe from "./Recipe"
import Graph from "./Graph.js"
import { apiURL } from '../../constants';

class DisplayStats extends React.Component {
    state = {
        selectedStats: [],
        stats: null,
        loading: false
    }

    componentDidUpdate(prevProps, prevState) {

        if ((this.props.realm.value && this.props.selectedRecipe._id) && (prevProps.realm.value !== this.props.realm.value || prevProps.selectedRecipe._id !== this.props.selectedRecipe._id)) {
            let fetches = [];
            console.log('%c Fetching', 'background: #222; color: #bada55');
            this.setState({ loading: true, stats: null }, () => {
                this.props.selectedRecipe.reagents.map(reagent => fetches.push(this.fetchItemStats(reagent.blizzardId)));
                fetches.push(this.fetchItemStats(this.props.selectedRecipe.craft.blizzardId));
                Promise.all(fetches).then((responses) => {
                    let stats = {};
                    responses.map(response => stats[response[0].itemId] = response);
                    this.setState({ loading: false, stats });
                    console.log('%c End Fetching', 'background: #222; color: #bada55');
                });
            }
            );
        }
    }

    fetchItemStats(itemId) {
        return fetch(`${apiURL}/itemstats/${this.props.realm.value}/${itemId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Not found");
            }
            return res.json()
        })
    }
    
    handleSelectedStats = (selectedStats) => {
        this.setState({ selectedStats })
    }

    render() {
        let display;
        if (this.props.realm && this.props.selectedRecipe.type) {
            display = (
                <Row>
                    <Col span={6}>
                        <Recipe handler={this.handleSelectedStats} recipe={this.props.selectedRecipe} />
                    </Col>
                    {!this.state.loading && this.state.stats &&
                        <Col span={18}>
                            <Graph selectedStats={this.state.selectedStats} stats={this.state.stats} recipe={this.props.selectedRecipe} />
                        </Col>
                    }
                </Row>
            )
        } else {
            display = <h3>Please select {!this.props.realm && 'a realm'} {(!this.props.realm && !this.props.selectedRecipe.type) && 'and'} {!this.props.selectedRecipe.type && 'a recipe'}</h3>;
        }

        return (
            display
        );
    }
}

const mapStatetoProps = state => {
    return {
        selectedRecipe: state.recipes.selectedRecipe
    }
};

export default connect(mapStatetoProps)(DisplayStats);


