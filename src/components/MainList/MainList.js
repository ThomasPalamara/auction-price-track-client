import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { Row, Col, Spin, Icon, Divider } from 'antd';
import MainListItem from './MainListItem';
import MainListFilter from './MainListFilter';
import ItemLanguage from '../ItemLanguage';
import selectRecipes from '../../selectors/recipes';
import { addRecipes } from '../../actions/recipes';
import { apiURL, recipePropTypes } from '../../constants';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

// Cannot use hook without breaking the WH link refresher. Inside a hook they are updating infinitly.
// Maybe the update need to be done inside the mainlistitem component to avoid that.
// But it also mean calling the function for each and every items instead of calling it one time here

export class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  // Adding all recipe to the store.
  componentWillMount() {
    const { dispatch } = this.props;

    fetch(`${apiURL}/recipes`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not found');
        }
        return res.json();
      })
      .then((response) => {
        this.setState({ loading: false });
        dispatch(addRecipes(response));
      });
  }

  // Function provided by WowHead allowing us to refresh the icons and tooltip provided by them.
  // We need to update everytime a recipe appear or disappear due to filters.
  componentDidUpdate() {
    window.$WowheadPower.refreshLinks();
  }

  render() {
    const { recipesList, itemLanguage, selectedRecipe } = this.props;
    const { loading } = this.state;
    return (
      <div className="mainList">
        <Divider orientation="left">
          <h3 className="step">2/ Choose your Items</h3>
        </Divider>

        <MainListFilter />

        <Row className="mainList__container">
          <Col span={24}>
            <Spin spinning={loading} indicator={antIcon}>
              <ul className="mainList__list">
                <FlipMove>
                  {recipesList
                    && recipesList
                      .map(item => (
                        <MainListItem
                          element={item}
                          key={item._id}
                          itemLanguage={itemLanguage}
                          active={(selectedRecipe && selectedRecipe._id === item._id) || false}
                        />
                      ))
                  }
                </FlipMove>
              </ul>
            </Spin>
          </Col>
        </Row>
      </div>
    );
  }
}

MainList.propTypes = {
  recipesList: PropTypes.arrayOf(PropTypes.object).isRequired,

  itemLanguage: PropTypes.string,

  selectedRecipe: recipePropTypes,
  dispatch: PropTypes.func.isRequired,
};

MainList.defaultProps = { itemLanguage: 'en', selectedRecipe: null };

const mapStatetoProps = state => ({
  itemLanguage: state.itemLanguage,
  recipesList: selectRecipes(state.recipes.recipesList, state.filters),
  selectedRecipe: state.recipes.selectedRecipe,
});

// More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(MainList);
