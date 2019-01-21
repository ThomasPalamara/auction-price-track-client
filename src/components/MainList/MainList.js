import React from "react";
import { connect } from 'react-redux';
import MainListItem from "./MainListItem";
import MainListFilter from "./MainListFilter";
import FlipMove from "react-flip-move";
import { Row, Col, Spin, Icon, Divider } from "antd";
import ItemLanguage from "../ItemLanguage";
import selectRecipes from "../../selectors/recipes";
import { addRecipes } from "../../actions/recipes";
import { apiURL } from "../../constants";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsJSON: null,
      recipesJSON: null,
      loading: true,
    }
  }

  componentDidUpdate() {
    window.$WowheadPower.refreshLinks();
  }
  componentWillMount() {
    fetch(`${apiURL}/recipes`)
      .then(res => res.json())
      .then(response => {
        this.setState({ loading: false });
        this.props.dispatch(addRecipes(response));
      });
  }
  componentDidMount() {
    fetch(`${apiURL}/items`)
      .then(res => res.json())
      .then(response => {
        this.setState({ response: response });
      });
  }


  render() {
    return (
      <div className="MainList">
      <Divider orientation="left"> <h3 className={`step ${this.state.status}`}>2/ Choose your Recipe</h3> </Divider>

        <MainListFilter activeList={this.state.activeList} handleToggleList={this.handleToggleList} />

        <ItemLanguage />

        <Row className="container-item-display">
          <Col span={24}>
            <Spin spinning={this.state.loading} indicator={antIcon}>
              <ul className="list">
                <FlipMove>
                  {this.props.recipesList &&
                    this.props.recipesList
                      .map((item, i) => {
                        return (<MainListItem element={item} key={item._id} itemLanguage={this.props.itemLanguage} active={this.props.selectedRecipe._id === item._id}/>)
                      })
                  }
                </FlipMove>
              </ul>

            </Spin>
          </Col>
        </Row>

      </div>
    )
  }
};

const mapStatetoProps = state => {
  return {
    itemLanguage: state.itemLanguage,
    recipesList: selectRecipes(state.recipes.recipesList, state.filters),
    selectedRecipe : state.recipes.selectedRecipe
  }
};

//	More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(MainList);