import React from "react";
import { connect } from 'react-redux';
import MainListItem from "./MainListItem";
import MainListFilter from "./MainListFilter";
import FlipMove from "react-flip-move";
import { Row, Col, Spin, Icon, Button } from "antd";
import ItemLanguage from "./ItemLanguage";

const reagentJson = require( "../reagent-list.json");
//reagentJson = reagentJson.reagents; Voir avec LUDO

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      loading: true
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

  handleTypeofItem = (type) => {
    this.setState({ typeOfAddedItem: type })
  }


  render() {
    const reagents = reagentJson.reagents;
    return (
      <div className="MainList">
        <h2 className="step">2/ Choisissez vos objets</h2>

        <MainListFilter />
        
        <ItemLanguage/>

        <Row className="container-item-display">
          <Col span={24}>
            <Spin spinning={this.state.loading} indicator={antIcon}>
              <ul className="item-list">
                <FlipMove>
                  {this.state.response &&
                    reagents
                      .map(item => {
                        return (<MainListItem items={item} list-type="reagents" itemLanguage={this.props.itemLanguage}/>)
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
    product: state.product,
    ingredient: state.ingredient,
    itemLanguage: state.itemLanguage
  }
};

//	More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(MainList);