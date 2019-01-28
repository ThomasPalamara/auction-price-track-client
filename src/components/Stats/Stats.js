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
            console.log('Fetching');
            this.setState({ loading: true }, () => {
                console.log(this.state.loading, 'before fetch');
                this.props.selectedRecipe.reagents.map(reagent => fetches.push(this.fetchItemStats(reagent.blizzardId)));
                fetches.push(this.fetchItemStats(this.props.selectedRecipe.craft.blizzardId));
                Promise.all(fetches).then((response) => {
                    console.log(response);
                    this.setState({ loading: false });
                    console.log('End Fetching');
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
        // console.log('stats', this.state.stats);
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
            <div>
                {!this.props.selectedRecipe && this.state.stats &&
                    <div>
                        {this.props.selectedRecipe.reagents.map((reagent) => <h1>{this.state.stats[reagent.blizzardId].name} Stats</h1>
                        )}
                    </div>
                }
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        selectedRecipe: state.recipes.selectedRecipe
    }
};

export default connect(mapStatetoProps)(DisplayStats);


