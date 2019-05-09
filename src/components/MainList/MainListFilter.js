/* eslint-disable react/jsx-boolean-value */
/* Option setting a value at true is necessary */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Radio, Select, Input } from 'antd';
import capitalize from 'functions/capitalize';
import { setTextFilter, setProfessionFilter, setisCustomFilter } from '../../actions/filters';

const { Option } = Select;

const MainListFilter = ({ professions, filters, dispatch }) => (
  <React.Fragment>
    <Radio.Group
      value={filters.isCustom}
      onChange={e => dispatch(setisCustomFilter(e.target.value))}
    >
      <Radio.Button value={false}>Recipes</Radio.Button>
      <Radio.Button value={true}>Reagents</Radio.Button>
    </Radio.Group>
    <label htmlFor="professionFilter" label="Profession : ">
      <Select id="professionFilter" defaultValue="all" style={{ width: 120 }} onChange={value => dispatch(setProfessionFilter(value))}>
        <Option value="all">All</Option>
        {
          professions.map(profession => (
            <Option key={profession.toLowerCase()} value={profession.toLowerCase()}>
              {capitalize(profession)}
            </Option>
          ))
        }
      </Select>
    </label>
    <Input
      value={filters.text}
      style={{ width: 200 }}
      allowClear
      placeholder="Filter items"
      onChange={e => (dispatch(setTextFilter(e.target.value)))}
    />
  </React.Fragment>
);

MainListFilter.propTypes = {
  professions: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.shape({
    isCustom: PropTypes.bool,
    profession: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const array = [];
  state.recipes.recipesList.map(recipe => recipe.professions.map(profession => (array.indexOf(profession) === -1 ? array.push(profession) : '')));

  return {
    filters: state.filters,
    professions: array,
  };
};

export default connect(mapStateToProps)(MainListFilter);
