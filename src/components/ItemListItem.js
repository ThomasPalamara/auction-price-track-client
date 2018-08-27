import React from 'react';
import { connect } from 'react-redux';
import {addProduct} from '../actions/product';
import {addIngredient} from '../actions/ingredient';

const ItemListItem = (props) => (
            <li>
                <a
                    href="#"
                    data-wowhead={`item=${props.item.id}`}
                    key={props.id}
                    onClick={(e) => {
                        if (props.typeOfAddedItem === 'product') {
                            props.dispatch(addProduct({ id: props.item.id, name:{ en: props.item.name, fr: props.item.name_fr} }))
                        } else {
                            props.dispatch(addIngredient({ id: props.item.id, name:{ en: props.item.name, fr: props.item.name_fr} }))
                        }
                    }
                    }
                >{props.itemLanguage === 'en' ? props.item.name : props.item.name_fr}</a> 
            </li>
        )


export default connect()(ItemListItem);


