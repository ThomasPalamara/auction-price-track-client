import React from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../actions/product';
import { addIngredient } from '../actions/ingredient';

const MainListItem = (props) => (
    <li>
        <div>
            <h6>Flask of the Current</h6>
            <ul>
                {props.items.map((item) => (
                    <li>
                        <a
                            href="#"
                            data-wowhead={`item=${item}`}
                            key={item}
                        >item</a>
                    </li>
                ))}
            </ul>
        </div>
    </li>
)

export default connect()(MainListItem);


