/* eslint-disable react/jsx-boolean-value */
/* Option setting a value at true is necessary */
import React from 'react';
import { connect } from 'react-redux';
import { Radio, Select } from 'antd';
import { setTextFilter, setProfessionFilter, setisCustomFilter } from '../../actions/filters';

const { Option } = Select;

export class MainListFilter extends React.Component {

  handleToggleList = (e) => {
    this.props.handleToggleList(e.target.value);
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // DEBUG
  // componentDidMount() {
  //     console.log(this.props, 'props');
  // }
  // componentDidUpdate() {
  //     console.log(this.props, 'props');
  // }
  render() {
    const { activeList, professions, filters, dispatch } = this.props;
    return (
      <div className="InputTextFilter">
        <Radio.Group value={activeList} onChange={e => dispatch(setisCustomFilter(e.target.value))}>
          <Radio.Button value={false}>Recipes</Radio.Button>
          <Radio.Button value={true}>Reagents</Radio.Button>
        </Radio.Group>
        <label htmlFor="professionFilter" label="Profession : ">
          <Select id="professionFilter" defaultValue="all" style={{ width: 120 }} onChange={value => dispatch(setProfessionFilter(value))}>
            <Option value="all">All</Option>
            {
              professions.map((profession, i) => {
                console.log(profession);
                return (<Option key={i} value={profession.toLowerCase()}>{this.capitalize(profession)}</Option>)
              })
            }
          </Select>
        </label>
        <input
          type="text"
          value={filters.text}
          placeholder="Filter items"
          onChange={e => ( dispatch(setTextFilter(e.target.value)) )} />
      </div>
    );
  }
}


const mapStateToProps = state => {
  let array = [];
  state.recipes.recipesList.map(recipe => recipe.professions.map(profession => array.indexOf(profession) === -1 ? array.push(profession) : ''));

  return {
    filters: state.filters,
    professions: array
  };
};

export default connect(mapStateToProps)(MainListFilter);
