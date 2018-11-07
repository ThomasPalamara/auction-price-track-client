import React from 'react';
import { connect } from 'react-redux';
import { setShoppingList } from '../actions/shoppingList'

const RecipeListItem = (props) => (
    <li className={`recipe list-item ${props.shoppingListId === props.element.craft.id ? 'selected' : ''}`} onClick={() => props.dispatch(setShoppingList(props.element))}
    >
        <div className="alchemyBg">
            {props.element.craft.id &&
                <h6>
                    <a
                        href="javascript(void)"
                        data-wowhead={`item=${props.element.craft.id}`}
                        key={props.element.craft.id}
                    >item</a>
                </h6>
            }

            <ul>
                {props.element.reagents.map((reagent) => (
                    <li>
                        <a
                            href="javascript(void)"
                            data-wowhead={`item=${reagent.id}`}
                            key={reagent.id}
                        >item</a>
                    </li>
                ))}
            </ul>
        </div>
    </li>
)

const mapStateToProps = state => {
    // if(state.shoppingList.)
    return {
        shoppingListId: state.shoppingList.craft.id
    };
};

export default connect(mapStateToProps)(RecipeListItem);


// const MainListItem = (props) => (
//     <li>
//         <div>
//             <ul>
//                 {props.items.map((item) => (
//                     <li>
//                         <a
//                             href="javascript(void)"
//                             data-wowhead={`item=${item}`}
//                             key={item}
//                         >item</a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     </li>
// )