import React from 'react';
import { connect } from 'react-redux';
import { removeProduct } from '../actions/product';
import { removeIngredient } from '../actions/ingredient';
import { Tag } from 'antd';

const ItemListAddedItem = (props) => (
    <li>
        <a
            data-wowhead={`item=${props.id}`}
            key={props.id}
            href="#"
        >{props.name}</a>
        <span onClick={() => {
            if (props.itemType === "product") {
                props.dispatch(removeProduct({ id: props.id }));
            } else {
                props.dispatch(removeIngredient({ id: props.id }));
            }}}
            ><i className={'anticon anticon-cross'}></i></span>
    </li>
)

const mapStatetoProps = state => {
    return {
      product: state.product,
      ingredient: state.ingredient
    }
  };
export default connect(mapStatetoProps)(ItemListAddedItem);


