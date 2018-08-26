import React from 'react';
import { connect } from 'react-redux';
import {addProduct} from '../actions/product';
import {addIngredient} from '../actions/ingredient';

const ItemListItem = (props) => (
            <li>
                <a
                    href="#"
                    data-wowhead={`item=${props.id}`}
                    key={props.id}
                    onClick={(e) => {
                        console.log(e.target);
                        if (props.typeOfAddedItem === 'product') {
                            props.dispatch(addProduct({ id: props.id, name:props.name }))
                        } else {
                            props.dispatch(addIngredient({ id: props.id, name:props.name }))
                        }
                    }
                    }
                >{props.name}</a> 
            </li>
        )


export default connect()(ItemListItem);


