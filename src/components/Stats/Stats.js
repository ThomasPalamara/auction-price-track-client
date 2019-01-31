import React from "react";
import { connect } from 'react-redux';
import { Row, Col, Tabs, Icon } from "antd";
import Recipe from "./Recipe"
import GraphsItems from "./GraphsItems.js"
import { apiURL } from '../../constants';

const TabPane = Tabs.TabPane;

class Stats extends React.Component {
    state = {
        selectedStats: [],
        itemsStats: null,
        loading: false
    }

    componentDidUpdate(prevProps, prevState) {

        if ((this.props.realm.value && this.props.recipe._id) && (prevProps.realm.value !== this.props.realm.value || prevProps.recipe._id !== this.props.recipe._id)) {
            let fetches = [];
            console.log('%c Fetching', 'background: #222; color: #bada55');
            this.setState({ loading: true, itemsStats: null }, () => {
                this.props.recipe.reagents.map(reagent => fetches.push(this.fetchItemStats(reagent.blizzardId)));
                fetches.push(this.fetchItemStats(this.props.recipe.craft.blizzardId));
                Promise.all(fetches).then((responses) => {
                    let itemsStats = {};
                    responses.map(response => itemsStats[response[0].itemId] = response);
                    this.setState({ loading: false, itemsStats });
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
        // selectedStats = selectedStats.map(e => JSON.parse(e))
        this.setState({ selectedStats })
    }

    render() {
        let {recipe, realm} = this.props;
        console.log(this.props);
        console.log(recipe);
        console.log(realm);
        let display;
        if (realm && recipe.type) {
            display = (
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="border" />Items</span>} key="1"><GraphsItems loading={this.state.loading} itemsStats={this.state.itemsStats} recipe={recipe}/></TabPane>
                    <TabPane tab={<span><Icon type="table" />Recipe</span>} key="2">Content of Tab Pane 2</TabPane>
                </Tabs>
            )
        } else {
            display = <h3>Please select {!realm && 'a realm'} {(!realm && !recipe.type) && 'and'} {!recipe.type && 'a recipe'}</h3>;
        }

        return (
            display
        );
    }
}

const mapStatetoProps = state => {
    return {
        recipe: state.recipes.selectedRecipe
    }
};

export default connect(mapStatetoProps)(Stats);


