import React from "react";
import { connect } from 'react-redux';
import ItemListItem from "./ItemListItem";
import ItemListAddedItem from "./ItemListAddedItem";
import ItemListFilter from "./ItemListFilter";
import FlipMove from "react-flip-move";
import { Row, Col, Spin, Icon } from "antd";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      realm: '',
      typeOfAddedItem: 'product',
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
    return (
      <div className="ItemList">
        <h2 className="step">2/ Choisissez vos objets</h2>

        <ItemListFilter />

        <div>
          <button
            className={`typeOfItemBtn ${this.state.typeOfAddedItem === 'product' ? 'selected' : ''}`}
            onClick={() => this.handleTypeofItem('product')}
          >Ajouter objets à vendre</button>

          <button
            className={`typeOfItemBtn ${this.state.typeOfAddedItem === 'ingredient' ? 'selected' : ''}`}
            onClick={() => this.handleTypeofItem('ingredient')}>Ajouter objets à acheter</button>
        </div>

        <Row className="container-item-display">
          <Col span={6} className="selected-items">
            <Row style={{ width: '100%' }}>
              <Col span={12}>
                <p className={this.state.typeOfAddedItem === 'product' ? 'selected' : ''}>Produits à vendre</p>
                <ul>
                  {this.props.product.map((item =>
                    <ItemListAddedItem id={item.id} name={item.name} itemType="product" />
                  ))}
                </ul>
              </Col>
              <Col span={12}>
                <p className={this.state.typeOfAddedItem === 'ingredient' ? 'selected' : ''}>Ingrédients necessaires</p>
                <ul>
                  {this.props.ingredient.map((item =>
                    <ItemListAddedItem id={item.id} name={item.name} itemType="ingredient" />
                  ))}
                </ul>
              </Col>
            </Row>
          </Col>

          <Col span={18}>
            <Spin spinning={this.state.loading} indicator={antIcon}>
              <ul className="item-list">
                <FlipMove>
                  {this.state.response &&
                    this.state.response
                      .filter(
                        (item) => (item.name.toLowerCase().includes(this.props.textFilter.toLowerCase()))
                      )
                      .slice(0, 30)
                      .map(item => (
                        <ItemListItem id={item.id} name={item.name} typeOfAddedItem={this.state.typeOfAddedItem} />))
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
    ingredient: state.ingredient

  }
};

//	More common way to do is to export by default for the HOC and call the function as parameters
export default connect(mapStatetoProps)(ItemList);