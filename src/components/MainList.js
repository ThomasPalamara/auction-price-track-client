import React from "react";
import { connect } from 'react-redux';
import ReagentListItem from "./ReagentListItem";
import RecipeListItem from "./RecipeListItem";
import MainListFilter from "./MainListFilter";
import FlipMove from "react-flip-move";
import { Row, Col, Spin, Icon } from "antd";
import ItemLanguage from "./ItemLanguage";

const reagentJson = require("../reagent-list.json");
const recipeJson = require("../recipe-list.json");
//reagentJson = reagentJson.reagents; Voir avec LUDO

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      loading: true,
      activeList: 'recipes'
    }
  }

  componentDidUpdate() {
    window.$WowheadPower.refreshLinks();
  }

  componentDidMount() {
    fetch(`/api/items`)
      .then(res => res.json())
      .then(response => {
        this.setState({ loading: false });
        this.setState({ response: response });
      });
  }

  handleToggleList = (e) => {
    this.setState({ activeList: e })
    // this.setState({ typeOfAddedItem: type })
  }

  filteringList = (list) => {
    if (this.props.professionFilter === 'all') {
      return list
    } else {
      return list.filter(item => {
        return item.profession === this.props.professionFilter;
      })
    }
  }



  render() {
    const reagents = reagentJson.reagents;
    const recipes = recipeJson.recipes;
    let list;
    let ListItemComponent;
    if (this.state.activeList === "recipes") {
      list = recipes;
      ListItemComponent = RecipeListItem
    } else {
      list = reagents;
      ListItemComponent = ReagentListItem
    }
    return (
      <div className="MainList">
        <h2 className="step">2/ Choisissez vos objets</h2>

        <MainListFilter activeList={this.state.activeList} handleToggleList={this.handleToggleList} />

        <ItemLanguage />

        <Row className="container-item-display">
          <Col span={24}>
            <Spin spinning={this.state.loading} indicator={antIcon}>
              <ul className="list">
                <FlipMove>
                  {this.state.response &&
                    this.filteringList(recipeJson[this.state.activeList])
                      .map(item => {
                        return (<RecipeListItem element={item} itemLanguage={this.props.itemLanguage} />)
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
    textFilter: state.filters.text,
    professionFilter: state.filters.profession,
    product: state.product,
    ingredient: state.ingredient,
    itemLanguage: state.itemLanguage
  }
};

//	More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(MainList);