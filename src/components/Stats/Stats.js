import React from "react";
import { connect } from 'react-redux';
import { Row, Col } from "antd";
import Recipe from "./Recipe"
import Stats from "./Graph.js"
import { apiURL } from '../../constants';

class DisplayStats extends React.Component {
    state = {
        selectedStats: [],
        realm: {
            label: '',
            value: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.selectedStats.length);
        if ((this.props.realm.value && this.state.selectedStats.length) && ( prevProps.realm.value !== this.props.realm.value  ||  prevState.selectedStats !== this.state.selectedStats)) {
            console.log('Fetching');
            this.setState({ loading: true });
            fetch(`${apiURL}/itemstats/${this.props.realm.value}/${this.state.selectedStats[0]}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Not found");
                    }
                    console.log(res);
                    return res.json()
                })
                .then(response => {
                    this.setState({ loading: false });
                    console.log(response);
                    return this.setState({ stats: response })
                }
                );
        }
    }

    handleSelectedStats = (selectedStats) => {
        this.setState({ selectedStats })
    }

    render() {

        let display;
        console.log(!this.props.selectedRecipe.type);
        if (this.props.realm && this.props.selectedRecipe.type) {
            display = (
                <Row>
                    <Col span={6}>
                        <Recipe handler={this.handleSelectedStats} recipe={this.props.selectedRecipe} />
                    </Col>
                    <Col span={18}>
                        <Stats selectedStats={this.state.selectedStats} recipe={this.props.selectedRecipe} />
                    </Col>
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