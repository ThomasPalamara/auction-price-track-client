import React from "react";
import { connect } from 'react-redux';
import RecipeListItem from "./RecipeListItem";
import MainListFilter from "./MainListFilter";
import FlipMove from "react-flip-move";
import { Row, Col, Spin, Icon } from "antd";
import ItemLanguage from "./ItemLanguage";
import selectRecipes from "../selectors/recipes"
import { addRecipes } from "../actions/recipes"

//reagentJson = reagentJson.reagents; Voir avec LUDO

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class MainList extends React.Component {
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
  componentWillMount(){
    fetch(`/api/recipes`)
      .then(res => res.json())
      .then(response => {
        this.setState({ loading: false });
        console.log('ok');
        this.props.dispatch(addRecipes(response));
      });
  }
  componentDidMount() {
    fetch(`/api/items`)
      .then(res => res.json())
      .then(response => {
        this.setState({ response: response });
      });
  }



  render() {
    console.log(this.props.recipesList, "recipesList");
    return (
      <div className="MainList">
        <h2 className="step">2/ Choose your Recipe</h2>

        <MainListFilter activeList={this.state.activeList} handleToggleList={this.handleToggleList} />

        <ItemLanguage />

        <Row className="container-item-display">
          <Col span={24}>
            <Spin spinning={this.state.loading} indicator={antIcon}>
              <ul className="list">
                <FlipMove>
                  {this.props.recipesList &&
                    this.props.recipesList
                      .map((item,i) => {
                        return (<RecipeListItem element={item} key={i} itemLanguage={this.props.itemLanguage} />)
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
  console.log(state, "State in statetoprops");
  return {
    itemLanguage: state.itemLanguage,
    recipesList : selectRecipes(state.recipes,state.filters)
    // recipesList : state.recipes
  }
};

//	More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(MainList);