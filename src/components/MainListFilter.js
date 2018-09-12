import React from "react";
import { connect } from "react-redux";
import { Radio, Select,  } from 'antd';
import { setTextFilter, setProfessionFilter } from "../actions/filters";

const Option = Select.Option;

class MainListFilter extends React.Component {

     handleToggleList = (e) => {
         this.props.handleToggleList(e.target.value);
     }
     handleProfessionChange = (value) => {
        
    }
    componentDidMount() {
        console.log(this.props, 'props');
    }
    componentDidUpdate() {
        console.log(this.props, 'props');
    }
    render() {
        console.log(this.props.handleToggleList);
        console.log(this);
        return (
            <div className="InputTextFilter">
                <Radio.Group value={this.props.activeList} onChange={this.handleToggleList}>
                    <Radio.Button value="recipes">Recettes</Radio.Button>
                    <Radio.Button value="reagents">Composants</Radio.Button>
                </Radio.Group>
                <label> Metier : </label>
                <Select defaultValue="all" style={{ width: 120 }} onChange={value => {this.props.dispatch(setProfessionFilter(value))}}>
                    <Option value="all">Tout</Option>
                    <Option value="alchemy">Alchimie</Option>
                    <Option value="enchant">Enchantement</Option>
                </Select>
                <input
                    type="text"
                    value={this.props.filters.text}
                    placeholder="Filtrer les objets"
                    onChange={e => {this.props.dispatch(setTextFilter(e.target.value))}} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(MainListFilter);