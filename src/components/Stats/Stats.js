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
            let stats = new Object;
            let fetches = [];

            console.log('Fetching');
            this.setState({ loading: true }, () => {
                console.log(this.state.loading, 'before fetch');
                this.props.selectedRecipe.reagents.map(reagent => fetches.push(
                    fetch(`${apiURL}/itemstats/${this.props.realm.value}/${reagent.blizzardId}`)
                        .then(res => {
                            if (!res.ok) {
                                throw new Error("Not found");
                            }
                            return res.json()
                        })
                        .then(response => {
                            stats[reagent.blizzardId] = response;
                            console.log(stats);
                            // this.setState(state => { return ({ stats: Object.assign({}, state.stats, stat) }) });
                        })
                ));
                Promise.all(fetches).then(() => {
                    this.setState({ loading: false, stats });
                    console.log('End Fetching');
                });
            }
            );



        }
    }

    async fetchAll() {
        await this.fetchItemStats(this.props.selectedRecipe.craft.blizzardId);
        console.log('ok2');
        await this.props.selectedRecipe.reagents.map(reagent => this.fetchItemStats(reagent.blizzardId));
    }

    fetchItemStats(itemId) {
        fetch(`${apiURL}/itemstats/${this.props.realm.value}/${itemId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Not found");
                }
                return res.json()
            })
            .then(response => {
                let stat = {};
                stat[itemId] = response;
                console.log(this.state, 'test');
                this.setState(state => { return ({ stats: Object.assign({}, state.stats, stat) }) });
                // this.setState(prevState => ({
                //     stats: {
                //         ...prevState.stats,
                //         stat
                //     }
                // }))
                console.log('ok1');
            });
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


