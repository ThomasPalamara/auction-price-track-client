import React from "react";
import { connect } from "react-redux";
import { Radio, Select,  } from 'antd';
import { setTextFilter, setProfessionFilter, setisCustomFilter } from "../actions/filters";

const Option = Select.Option;

class MainListFilter extends React.Component {

     handleToggleList = (e) => {
         this.props.handleToggleList(e.target.value);
     }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //DEBUG
    // componentDidMount() {
    //     console.log(this.props, 'props');
    // }
    // componentDidUpdate() {
    //     console.log(this.props, 'props');
    // }
    render() {
        return (
            <div className="InputTextFilter">
                <Radio.Group value={this.props.activeList} onChange={e => {this.props.dispatch(setisCustomFilter(e.target.value))}}>
                    <Radio.Button value={false}>Recipes</Radio.Button>
                    <Radio.Button value={true}>Reagents</Radio.Button>
                </Radio.Group>
                <label> Profession : </label>
                <Select defaultValue="all" style={{ width: 120 }} onChange={value => {this.props.dispatch(setProfessionFilter(value))}}>
                    <Option value="all">All</Option>
                    {
                        this.props.professions.map( profession => (
                            <Option value={profession.toLowerCase()}>{this.capitalize(profession)}</Option>
                        ))
                    }
                </Select>
                <input
                    type="text"
                    value={this.props.filters.text}
                    placeholder="Filter items"
                    onChange={e => {this.props.dispatch(setTextFilter(e.target.value))}} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    console.log(state.recipes);
    let array = [];
    state.recipes.map( recipe => {recipe.professions.map( profession => {array.indexOf(profession) === -1 ? array.push(profession) : ''})})

    return {
        filters: state.filters,
        professions: array
    };
};

export default connect(mapStateToProps)(MainListFilter);