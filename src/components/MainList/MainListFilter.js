/* eslint-disable react/jsx-boolean-value */
/* Option setting a value at true is necessary */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Radio, Select, Input, Row, Col } from 'antd';
import capitalize from 'functions/capitalize';
import { setTextFilter, setProfessionFilter, setisCustomFilter } from '../../actions/filters';

const { Option } = Select;

// TODO Redo the whole text filter so it works with craft and recipe items
// TODO Decide if each filters should get its own component.
// TODO Found a solution for the scroll bar appearing while switching type of list on mobile.

// All filters values are sent to the store. The selector then filters the list in the MainList component.

const MainListFilter = ({ professions, filters, dispatch }) => (
  <React.Fragment>
    <Row className="filters__container" type="flex" justify="space-between" align="bottom">
      <Col order="1" className="filterGroup">
        <p className="filterGroup__label" htmlFor="professionFilter"> Type of list :</p>
        <Radio.Group
          value={filters.isCustom}
          onChange={e => dispatch(setisCustomFilter(e.target.value))}
        >
          <Radio.Button value={false}>Recipes</Radio.Button>
          <Radio.Button value={true}>Reagents</Radio.Button>
        </Radio.Group>
      </Col>

      <Col order="2" className="filterGroup">
        <p className="filterGroup__label" htmlFor="professionFilter">Profession :</p>
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
      </Col>
      <Col order="3" className="filterGroup">
        <p className="filterGroup__label" htmlFor="textFilter">Search item name :</p>
        <Input
          id="textFilter"
          value={filters.text}
          style={{ width: 172 }}
          placeholder="Filter items"
          onChange={e => (dispatch(setTextFilter(e.target.value)))}
        />
      </Col>
      <Col order="4" />
    </Row>
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
  // Getting all the professions names from the list of recipes
  state.recipes.recipesList.map(recipe => recipe.professions.map(profession => (array.indexOf(profession) === -1 ? array.push(profession) : '')));

  return {
    filters: state.filters,
    professions: array,
  };
};

export default connect(mapStateToProps)(MainListFilter);
