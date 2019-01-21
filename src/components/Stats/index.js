import React from "react";
import { connect } from 'react-redux';
import { Row, Col } from "antd";
import Recipe from "./Recipe"
import Stats from "./Graph.js"
import { apiURL } from '../../constants';

class DisplayStats extends React.Component {
    state = {
        selectedStats: []
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.realm && prevState.realm !== this.state.realm) {
            console.log('Fetching');
            this.setState({ loading: true });
            fetch(`${apiURL}/auctions/${this.state.realm}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Not found");
                    }
                    console.log(res);
                    return res.json()
                })
                .then(response => {
                    this.setState({ loading: false });
                    response.map((item) => {
                        return item.auctions[0].prices.sort(function (a, b) { return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0); });
                    })
                    return this.setState({ auctionHouse: response })
                }
                );
        }
    }

    handleSelectedStats = (selectedStats) => {
        this.setState({ selectedStats })
    }

    render() {
        console.log(this.props.realm);
        return (
            <Row>
                <Col span={6}>
                    <Recipe handler={this.handleSelectedStats} recipe={this.props.selectedRecipe} />
                </Col>
                <Col span={18}>
                    <Stats selectedStats={this.state.selectedStats} recipe={this.props.selectedRecipe} />
                </Col>
            </Row>
        );
    }
}

const mapStatetoProps = state => {
    return {
        selectedRecipe: state.recipes.selectedRecipe
    }
};

export default connect(mapStatetoProps)(DisplayStats);