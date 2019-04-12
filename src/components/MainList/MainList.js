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

export class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    fetch(`${apiURL}/recipes`)
      .then(res => res.json())
      .then((response) => {
        this.setState({ loading: false });
        dispatch(addRecipes(response));
      });
  }

  // componentDidMount() {
  //   fetch(`${apiURL}/items`)
  //     .then(res => res.json())
  //     .then(response => (
  //       this.setState({ response })
  //     ));
  // }

  componentDidUpdate() {
    // window.$WowheadPower.refreshLinks();
  }

  render() {
    const { recipesList, itemLanguage, selectedRecipe } = this.props;
    const { status, activeList, loading } = this.state;
    return (
      <div className="MainList">
        <Divider orientation="left">
          <h3 className={`step ${status}`}>2/ Choose your Recipe</h3>
        </Divider>

        <MainListFilter activeList={activeList} handleToggleList={this.handleToggleList} />

        <ItemLanguage />

        <Row className="container-item-display">
          <Col span={24}>
            <Spin spinning={loading} indicator={antIcon}>
              <ul className="list">
                <FlipMove>
                  {recipesList
                    && recipesList
                      .map(item => (
                        <MainListItem
                          element={item}
                          key={item._id}
                          itemLanguage={itemLanguage}
                          active={selectedRecipe._id === item._id}
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

  selectedRecipe: recipePropTypes.isRequired,
  dispatch: PropTypes.func.isRequired,
};

MainList.defaultProps = { itemLanguage: 'en' };

const mapStatetoProps = state => ({
  itemLanguage: state.itemLanguage,
  recipesList: selectRecipes(state.recipes.recipesList, state.filters),
  selectedRecipe: state.recipes.selectedRecipe,
});

// More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(MainList);
