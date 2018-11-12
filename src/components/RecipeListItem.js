import React from 'react';
import { connect } from 'react-redux';
import { setShoppingList } from '../actions/recipes'

const RecipeListItem = (props) => {
    // console.log(props);
    // console.log(props.element.craft.blizzardId);
    return (
        <li 
        className={`recipe list-item ${/*props.shoppingListId === props.element.craft.blizzardId*/ false ? 'selected' : ''}`} 
        onClick={() => props.dispatch(setShoppingList(props.element))}
        >
            <div className="alchemyBg">
                {props.element.craft &&
                    <h6>
                        <a
                            href="javascript:(void)"
                            data-wowhead={`item=${props.element.craft.blizzardId}`}
                        >item</a>
                    </h6>
                }

                <ul>
                     {props.element.reagents.map((reagent) => (
                         <li key={reagent.blizzardId}>
                             <a
                                 href="javascript:(void)"
                                 data-wowhead={`item=${reagent.blizzardId}`}
                             >item</a>
                         </li>
                     ))
                }
                </ul>
            </div>
        </li>)
};

const mapStateToProps = state => {
    // if(state.shoppingList.)
    return {
        // shoppingListId: state.shoppingList.craft.blizzardId
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